'use client';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import MenuBar from '@/components/MenuBar';
import { getActiveMenuItems } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { BackButton, InputField, FormSection, SubmitButton } from '@/components';

interface FormData {
  fullName: string;
  matricNo: string;
  icNo: string;
  licenseNo: string;
  vehicleNo: string;
  documents: {
    ic: File | null;
    matric: File | null;
    license: File | null;
  };
}

interface DropzoneProps {
  name: 'ic' | 'matric' | 'license';
  label: string;
  onFileChange: (name: string, file: File) => void;
  currentFile: File | null;
}

const FileUploadBox = ({ name, label, onFileChange, currentFile }: DropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onFileChange(name, acceptedFiles[0]);
    }
  }, [name, onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 transition-colors
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400'
          }
        `}
      >
        <input {...getInputProps()} name={name} required />
        <div className="text-center">
          {currentFile ? (
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Selected file:</div>
              <div className="text-sm font-medium text-indigo-600">{currentFile.name}</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                <svg 
                  className="w-10 h-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-600">
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag & drop file here, or click to select</p>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Supports: Images (PNG, JPG) and PDF
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function NewApplication() {
  const pathname = usePathname();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    matricNo: '',
    icNo: '',
    licenseNo: '',
    vehicleNo: '',
    documents: {
      ic: null,
      matric: null,
      license: null,
    },
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (name: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <MenuBar items={getActiveMenuItems(pathname)} />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <BackButton href="/application" label="Back to Applications" />
        
        <h1 className="text-2xl font-bold text-indigo-800 mb-4">New Sticker Application</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <FormSection title="Personal Information">
              <InputField
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <InputField
                id="matricNo"
                name="matricNo"
                label="Matric Number"
                value={formData.matricNo}
                onChange={handleInputChange}
                required
              />
              <InputField
                id="icNo"
                name="icNo"
                label="IC Number"
                value={formData.icNo}
                onChange={handleInputChange}
                required
              />
            </FormSection>

            {/* Vehicle Information */}
            <FormSection title="Vehicle Information">
              <InputField
                id="licenseNo"
                name="licenseNo"
                label="License Number"
                value={formData.licenseNo}
                onChange={handleInputChange}
                required
              />
              <InputField
                id="vehicleNo"
                name="vehicleNo"
                label="Vehicle Number"
                value={formData.vehicleNo}
                onChange={handleInputChange}
                required
              />
            </FormSection>
          </div>

          {/* Documents Section */}
          <div className="mt-6">
            <FormSection title="Required Documents">
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <FileUploadBox
                  name="ic"
                  label="IC Card"
                  onFileChange={handleFileChange}
                  currentFile={formData.documents.ic}
                />
                <FileUploadBox
                  name="matric"
                  label="Matric Card"
                  onFileChange={handleFileChange}
                  currentFile={formData.documents.matric}
                />
                <FileUploadBox
                  name="license"
                  label="Driving License"
                  onFileChange={handleFileChange}
                  currentFile={formData.documents.license}
                />
              </div>
            </FormSection>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <SubmitButton label="Submit Application" />
          </div>
        </form>
      </main>
    </div>
  );
}
