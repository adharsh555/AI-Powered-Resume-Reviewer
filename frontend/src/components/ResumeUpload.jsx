import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const ResumeUpload = ({ onAnalyze, loading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0] && e.dataTransfer.files[0].type === 'application/pdf') {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please upload a resume');
      return;
    }
    if (jobDesc.trim().length < 30) {
      alert('Please enter a job description');
      return;
    }
    onAnalyze(resumeFile, jobDesc);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Upload Resume (PDF only)
          </label>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-upload').click()}
          >
            <input 
              id="resume-upload"
              type="file" 
              className="hidden" 
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-3" />
            {resumeFile ? (
              <p className="text-gray-700 font-medium">{resumeFile.name}</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">Drag & drop your resume here</p>
                <p className="text-gray-500 text-sm mt-2">or click to browse files</p>
              </>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Job Description
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste the job description you're applying for..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Resume...
            </div>
          ) : 'Review My Resume'}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;