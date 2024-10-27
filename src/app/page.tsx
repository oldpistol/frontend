'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MenuBar from '@/components/MenuBar';
import { menuItems } from '@/config/navigation';
import Link from 'next/link';

interface VehicleData {
  id: number;
  year: number;
  vehicleNo: string;
  status: "Active" | "Expired";
}

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Sample data
  const vehicles: VehicleData[] = [
    { id: 1, year: 2023, vehicleNo: "ABC 1234", status: "Active" },
    { id: 2, year: 2022, vehicleNo: "DEF 5678", status: "Expired" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <MenuBar items={menuItems} />
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800">Welcome to Your App</h1>
          <Link 
            href="/application/new" 
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-base py-2 px-4 rounded inline-flex items-center gap-3 shadow-sm transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>New Application</span>
          </Link>
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
                    <Link 
                      href={`/application/${vehicle.id}`} 
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      View
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link 
                      href={`/application/${vehicle.id}/edit`} 
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Edit
                    </Link>
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
