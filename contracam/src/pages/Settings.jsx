import React from 'react';
import Navigation from '../components/Navigation';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="bg-gradient-to-r from-black to-gray-500 rounded-t-lg p-6 relative">
            <h1 className="text-white text-2xl font-bold">Profile</h1>
            <div className="absolute top-[-40px] right-8 w-20 h-20 bg-white rounded-full overflow-hidden shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span>Raghul</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Date of Birth:</span>
                <span>2 NOV 2006</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Gender:</span>
                <span>Male</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">City:</span>
                <span>Coimbatore</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Contact No.:</span>
                <span>984123XXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span>user123@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Password:</span>
                <span>••••••••</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-md shadow">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
