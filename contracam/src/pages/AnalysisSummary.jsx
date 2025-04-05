// src/pages/AnalysisSummary.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import sampleImage from '../assets/sample.png'; // Import the sample image

const AnalysisSummary = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    // In a real app, this would be an API call to fetch the contract details
    // Mock data for now
    const fetchContractDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock contract data
        const mockContracts = [
          {
            id: '1',
            title: 'Employment Contract',
            uploadDate: '2025-04-01',
            status: 'Completed',
            pages: 5,
            thumbnail: sampleImage,
            confidenceScore: 98,
            alertsCount: 2,
            summary: 'This is a standard employment contract between Employer Inc. and an employee. It includes terms for compensation, benefits, work responsibilities, and termination conditions.',
            keyPoints: [
              'Employment term begins on May 1, 2025 and continues until terminated',
              'Base salary of $85,000 per year, paid bi-weekly',
              'Two weeks of paid vacation annually',
              '401(k) retirement plan with 3% employer match',
              'Confidentiality and non-compete clauses included'
            ],
            detailedSections: [
              {
                title: 'Compensation and Benefits',
                content: 'Employee will receive a base salary of $85,000 per year, paid bi-weekly. Benefits include health insurance (medical, dental, vision), two weeks of paid vacation annually, sick leave as needed, and a 401(k) retirement plan with 3% employer match.',
                alerts: []
              },
              {
                title: 'Term and Termination',
                content: 'Employment begins on May 1, 2025 and continues until terminated by either party. Either party may terminate the employment with 2 weeks written notice. Employer may terminate without notice for cause.',
                alerts: []
              },
              {
                title: 'Non-Compete Clause',
                content: 'Employee agrees not to work for any direct competitor for a period of 12 months after termination of employment within a 50-mile radius of Employer\'s business locations.',
                alerts: [
                  {
                    level: 'warning',
                    message: 'Non-compete clauses may have enforceability limitations in some jurisdictions'
                  }
                ]
              },
              {
                title: 'Intellectual Property',
                content: 'All work product, inventions, and intellectual property created during employment belongs to the Employer. Employee agrees to assign all rights to the Employer.',
                alerts: []
              },
              {
                title: 'Dispute Resolution',
                content: 'Any disputes arising from this agreement will be resolved through binding arbitration rather than court proceedings.',
                alerts: [
                  {
                    level: 'critical',
                    message: 'Mandatory arbitration clause limits your right to pursue legal action in court'
                  }
                ]
              }
            ]
          },
          {
            id: '2',
            title: 'Lease Agreement',
            uploadDate: '2025-04-02',
            status: 'Completed',
            pages: 3,
            thumbnail: sampleImage,
            confidenceScore: 95,
            alertsCount: 0,
            summary: 'This is a lease agreement between a landlord and a tenant. It includes terms for rent, security deposit, and maintenance responsibilities.',
            keyPoints: [
              'Lease term begins on June 1, 2025 and ends on May 31, 2026',
              'Monthly rent of $1,200, due on the 1st of each month',
              'Security deposit of $1,200 required',
              'Tenant responsible for utilities and minor maintenance',
              'Landlord responsible for major repairs'
            ],
            detailedSections: [
              {
                title: 'Rent and Payment',
                content: 'Tenant agrees to pay $1,200 per month in rent, due on the 1st of each month. Late payments will incur a $50 fee.',
                alerts: []
              },
              {
                title: 'Security Deposit',
                content: 'Tenant will provide a security deposit of $1,200, which will be returned at the end of the lease term, less any deductions for damages.',
                alerts: []
              },
              {
                title: 'Maintenance Responsibilities',
                content: 'Tenant is responsible for minor maintenance, such as changing light bulbs and unclogging drains. Landlord is responsible for major repairs, such as plumbing and electrical issues.',
                alerts: []
              },
              {
                title: 'Termination and Renewal',
                content: 'Lease will automatically terminate on May 31, 2026. Tenant may request renewal with 30 days written notice.',
                alerts: []
              },
              {
                title: 'Dispute Resolution',
                content: 'Any disputes arising from this agreement will be resolved through mediation before pursuing legal action.',
                alerts: []
              }
            ]
          },
          {
            id: '3',
            title: 'Service Agreement',
            uploadDate: '2025-04-03',
            status: 'Processing',
            pages: 7,
            thumbnail: sampleImage,
            confidenceScore: 90,
            alertsCount: 0,
            summary: 'This is a service agreement between a client and a service provider. It includes terms for scope of work, payment, and confidentiality.',
            keyPoints: [
              'Service provider will deliver services as outlined in the attached scope of work',
              'Client agrees to pay $5,000 upon completion of services',
              'Confidentiality agreement prohibits disclosure of client information',
              'Agreement is effective from April 1, 2025 to March 31, 2026',
              'Either party may terminate the agreement with 30 days written notice'
            ],
            detailedSections: [
              {
                title: 'Scope of Work',
                content: 'Service provider will deliver services as outlined in the attached scope of work. Any changes to the scope must be agreed upon in writing.',
                alerts: []
              },
              {
                title: 'Payment Terms',
                content: 'Client agrees to pay $5,000 upon completion of services. Late payments will incur a 5% fee.',
                alerts: []
              },
              {
                title: 'Confidentiality',
                content: 'Both parties agree to maintain confidentiality of all information disclosed during the term of this agreement.',
                alerts: []
              },
              {
                title: 'Termination',
                content: 'Either party may terminate the agreement with 30 days written notice. Termination does not relieve either party of obligations incurred prior to termination.',
                alerts: []
              },
              {
                title: 'Dispute Resolution',
                content: 'Any disputes arising from this agreement will be resolved through arbitration.',
                alerts: []
              }
            ]
          }
        ];

        const contractDetails = mockContracts.find(contract => contract.id === id);
        setContract(contractDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contract details:', error);
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, [id]);

  const toggleSection = (index) => {
    setExpandedSections({
      ...expandedSections,
      [index]: !expandedSections[index]
    });
  };

  const downloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download would start here in a real application');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse flex flex-col">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-900">Contract not found</h2>
              <p className="mt-2 text-gray-500">
                The contract you're looking for doesn't exist or has been deleted.
              </p>
              <div className="mt-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  &larr; Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold leading-tight text-black-900">Contract Analysis</h1>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                &larr; Back to Dashboard
              </Link>
            </div>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Contract Header */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
              <div className="px-4 py-5 sm:px-6 flex items-center">
                <img
                  src={contract.thumbnail}
                  alt={contract.title}
                  className="h-24 w-20 object-cover rounded border border-gray-200 mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{contract.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Uploaded: {contract.uploadDate} • {contract.pages} Pages
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      {contract.status}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {contract.confidenceScore}% Confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Summary</h3>
                  <button
                    type="button"
                    onClick={() => setExpandedSummary(!expandedSummary)}
                    className="text-primary-600 hover:text-primary-500 flex items-center text-sm font-medium"
                  >
                    {expandedSummary ? (
                      <>
                        <FaChevronUp className="mr-1" /> Show Less
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="mr-1" /> Show More
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {contract.summary}
                </p>
                {expandedSummary && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Key Points:</h4>
                    <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
                      {contract.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end">
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  <FaDownload className="mr-2" /> Download Report
                </button>
              </div>
            </div>

            {/* Alert Badges */}
            {contract.detailedSections.some(section => section.alerts.length > 0) && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800">Contract Alerts</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        We've identified potential issues in this contract that you should review carefully.
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {contract.detailedSections
                          .flatMap(section => 
                            section.alerts.map((alert, i) => (
                              <li key={`${section.title}-alert-${i}`}>
                                <strong>{section.title}:</strong> {alert.message}
                              </li>
                            ))
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Sections */}
            <div className="mt-6 bg-white shadow sm:rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Detailed Analysis</h3>
              </div>
              
              {contract.detailedSections.map((section, index) => (
                <div key={index} className="px-4 py-5 sm:px-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => toggleSection(index)}
                  >
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      {section.title}
                      {section.alerts.length > 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Alert
                        </span>
                      )}
                    </h4>
                    {expandedSections[index] ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                  
                  {expandedSections[index] && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{section.content}</p>
                      
                      {section.alerts.length > 0 && (
                        <div className="mt-3 rounded-md bg-red-50 p-3">
                          {section.alerts.map((alert, alertIndex) => (
                            <div key={alertIndex} className="flex">
                              <FaExclamationTriangle className={`h-5 w-5 ${alert.level === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                              <p className="ml-2 text-sm text-red-700">{alert.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Signature/Verification Section */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FaCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Contract Analyzed Successfully</h3>
                    <p className="text-sm text-gray-500">This analysis was completed on {contract.uploadDate} with {contract.confidenceScore}% confidence.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions Footer */}
            <div className="mt-6 flex items-center justify-between">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                &larr; Back to Dashboard
              </Link>
              
              <Link
                to="/upload"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Upload Another Contract
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisSummary;