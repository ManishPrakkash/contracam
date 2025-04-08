// src/pages/UploadContract.jsx
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaTrash, FaExclamationCircle } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import Tesseract from 'tesseract.js'; // Import OCR library

const UploadContract = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  //const [ocrResults, setOcrResults] = useState([]); // Store OCR results
  
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', 'upload'); // Store the current page in localStorage
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    // Check if they're images
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length < acceptedFiles.length) {
      setError('Only image files are allowed');
      return;
    }
    
    // Create preview URLs for the images
    const newFiles = imageFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    
    setFiles(prev => [...prev, ...newFiles]);
    setError('');
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.bmp']
    },
    maxFiles: 10
  });
  
  const removeFile = (index) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleOCR = async (file) => {
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      return text;
    } catch (error) {
      console.error('OCR failed:', error);
      return '';
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image to process');
      return;
    }

    setUploading(true);
    try {
      const results = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          text: await handleOCR(file),
          thumbnail: file.preview, // Save the preview of the first page
        }))
      );

      const newContract = {
        id: `${Date.now()}`, // Unique ID
        name: files[0].name, // Use the first file's name
        text: results.map((result) => result.text).join('\n'), // Combine all OCR results
        thumbnail: files[0].preview, // Use the first page's preview as the thumbnail
      };

      const history = JSON.parse(localStorage.getItem('ocrHistory')) || [];
      history.push(newContract); // Add the new contract to history
      localStorage.setItem('ocrHistory', JSON.stringify(history));

      navigate(`/analysis-summary/${history.length}`); // Navigate to the new contract's summary
    } catch (err) {
      setError('Failed to process files. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Upload Contract</h1>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaExclamationCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div
                  {...getRootProps()}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                  }`}
                >
                  <div className="space-y-1 text-center">
                    <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload images</span>
                        <input {...getInputProps()} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10 images, 10MB each
                    </p>
                    <p className="text-xs text-gray-500 font-semibold">
                      Upload the contract pages (up to 10 pages)
                    </p>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Uploaded Contract Pages ({files.length}/10)
                    </h3>
                    
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {files.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={file.preview}
                            alt={`Page ${index + 1}`}
                            className="h-40 w-32 object-cover rounded-md border border-gray-200"
                          />
                          <div className="absolute top-0 right-0 -mt-2 -mr-2">
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <FaTrash className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-center text-gray-500">
                            Page {index + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    We don't store your contracts - they're processed securely and then deleted.
                    Our AI system will analyze the contract and highlight important terms and potential issues.
                  </p>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={uploading || files.length === 0}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    uploading || files.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800'
                  }`}
                >
                  {uploading ? 'Processing...' : 'Process Contract'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadContract;