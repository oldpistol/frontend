'use client';
import { useState } from 'react';

interface VehicleData {
  id: number;
  year: number;
  vehicleNo: string;
  status: "Active" | "Expired";
}

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Sample data
  const vehicles: VehicleData[] = [
    { id: 1, year: 2023, vehicleNo: "ABC 1234", status: "Active" },
    { id: 2, year: 2022, vehicleNo: "DEF 5678", status: "Expired" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="main.html" className="flex items-center py-4 px-2">
                  <i className="lni lni-code text-indigo-600 text-2xl mr-2"></i>
                  <span className="font-semibold text-indigo-600 text-lg">UniSticker</span>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className="flex items-center focus:outline-none"
                >
                  <i className="lni lni-user text-indigo-600 text-2xl"></i>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <a href="profile.html" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Bar */}
      <div className="bg-indigo-100 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex space-x-8">
            <li>
              <a href="main.html" className="flex items-center py-4 px-2 text-indigo-800 border-b-2 border-indigo-800">
                <i className="lni lni-grid-alt mr-2"></i>
                <span>Applications</span>
              </a>
            </li>
            <li>
              <a href="chatbot.html" className="flex items-center py-4 px-2 text-indigo-600 hover:text-indigo-800">
                <i className="lni lni-comments mr-2"></i>
                <span>ChatBot</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800">Welcome to Your App</h1>
          <a href="application.html" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
            <i className="lni lni-plus mr-2"></i>New Application
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider">No</th>
                <th className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider">Year</th>
                <th className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider">Vehicle No</th>
                <th className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-base">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-indigo-50">
                  <td className="px-8 py-5 whitespace-nowrap">{vehicle.id}</td>
                  <td className="px-8 py-5 whitespace-nowrap">{vehicle.year}</td>
                  <td className="px-8 py-5 whitespace-nowrap">{vehicle.vehicleNo}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      vehicle.status === "Active" 
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap space-x-2">
                    <a href="application-detail.html" className="text-indigo-600 hover:text-indigo-900 font-medium">View</a>
                    <span className="text-gray-300">|</span>
                    <a href="application-edit.html" className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 text-sm">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <i className="lni lni-chevron-left h-5 w-5"></i>
                </a>
                {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                  <a
                    key={index}
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {page}
                  </a>
                ))}
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <i className="lni lni-chevron-right h-5 w-5"></i>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
