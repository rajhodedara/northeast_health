// src/pages/ViewSubmittedDataPage.jsx

import React, { useState, useEffect } from 'react';
import Icon from '../components/AppIcon'; // Adjusted path for being inside src/pages/

// ---- 1. ADD YOUR NPOINT.IO URL HERE ----
const NPOINT_URL = 'https://api.npoint.io/09942530f105bf8e8e2b'; 

const ViewSubmittedDataPage = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(NPOINT_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            // Sort data by submission time, newest first
            const sortedData = data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
            setSubmittedData(sortedData);
        } else {
            setSubmittedData([]); // Default to empty array if data is not an array
        }
      } catch (err) {
        console.error("Failed to fetch submitted data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000); // Auto-refresh every 15 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 text-text-primary">
        <Icon name="Loader" className="animate-spin mr-3" size={24} /> Loading Submitted Reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-600">
        <Icon name="AlertTriangle" className="mr-3" size={24} /> {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold leading-6 text-gray-900">Submitted Patient Reports</h1>
              <p className="mt-2 text-sm text-gray-700">A live list of all data submitted by ASHA workers from the field.</p>
          </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Sr. No.</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unique ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Symptoms</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Predicted Risk</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Village ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Submission Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {submittedData.length > 0 ? submittedData.map((report, index) => (
                    <tr key={report.id || index} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{report.id ? `...${report.id.slice(-6).toUpperCase()}` : 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">{report.name || 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.age || 'N/A'}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 capitalize">{report.symptoms?.join(', ') || 'None'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          report.predictedRisk === 'High' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10' :
                          report.predictedRisk === 'Medium' ? 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20' :
                          'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                        }`}>
                          {report.predictedRisk || 'N/A'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.villageId || 'N/A'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.submittedAt ? new Date(report.submittedAt).toLocaleString('en-IN') : 'N/A'}</td>
                    </tr>
                  )) : (
                    <tr>
                        <td colSpan="8" className="text-center py-10 text-gray-500">
                            No submitted data found.
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmittedDataPage;