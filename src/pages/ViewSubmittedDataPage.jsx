// src/pages/ViewSubmittedDataPage.jsx
import React, { useState, useEffect } from 'react';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const NPOINT_URL = 'https://api.npoint.io/09942530f105bf8e8e2b';

const ViewSubmittedDataPage = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load from cache immediately
    const cached = sessionStorage.getItem("patientDataCache");
    if (cached) setSubmittedData(JSON.parse(cached));

    fetchData(); // then fetch fresh copy
    const intervalId = setInterval(fetchData, 30000); // less frequent refresh
    return () => clearInterval(intervalId);
  }, []);

  // --- FETCH DATA FROM NPOINT ---
  const fetchData = async () => {
    setIsLoading(submittedData.length === 0); // only show loader if no data
    try {
      const res = await fetch(NPOINT_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setSubmittedData(sorted);
        sessionStorage.setItem("patientDataCache", JSON.stringify(sorted)); // cache it
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server unavailable. Showing last saved data.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- CLEAR ALL DATA ---
  const clearAllData = async () => {
    try {
      const res = await fetch(NPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([]),
      });
      if (!res.ok) throw new Error('Failed to clear data');
      setSubmittedData([]);
      alert('All submitted data has been permanently deleted.');
    } catch (err) {
      console.error('Clear error:', err);
      alert('Error clearing data. Check console.');
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("patientData:updated", fetchData);
    return () => window.removeEventListener("patientData:updated", fetchData);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 text-text-primary">
        <Icon name="Loader" className="animate-spin mr-3" size={24} />
        Loading Submitted Reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-600">
        <Icon name="AlertTriangle" className="mr-3" size={24} />
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-gray-900 text-text-primary">
            Submitted Patient Reports
          </h1>
          <p className="mt-2 text-sm text-gray-700 text-text-secondary">
            A live list of all data submitted by ASHA workers from the field.
          </p>
        </div>

        {/* --- BUTTONS --- */}
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-3">
          <Button onClick={fetchData} iconName="RefreshCw" iconPosition="left">
            Refresh View
          </Button>
          <Button
            onClick={clearAllData}
            iconName="Trash2"
            iconPosition="left"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Clear All Data
          </Button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Sr. No.</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unique ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Symptoms</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Predicted Risk</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Village ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Submission Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {submittedData.length > 0 ? (
                    submittedData.map((report, index) => (
                      <tr key={report.id || index} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                          {report.id ? `...${report.id.slice(-6).toUpperCase()}` : 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                          {report.patientName || report.name || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.age || 'N/A'}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 capitalize">
                          {report.symptoms?.join(', ') || 'None'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${report.predictedRisk === 'High'
                              ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10'
                              : report.predictedRisk === 'Medium'
                                ? 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                                : 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                              }`}
                          >
                            {report.predictedRisk || 'Low Risk'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.villageId || 'N/A'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.submittedAt ? new Date(report.submittedAt).toLocaleString('en-IN') : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-10 text-gray-500">
                        No submitted data found. Start a new submission now!
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
