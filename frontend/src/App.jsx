import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import AnalysisResults from './components/AnalysisResults';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async (resumeFile, jobDesc) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDesc);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setResults(data);
      toast.success('Analysis completed successfully!');
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      toast.error('Analysis failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">AI Resume Reviewer</h1>
          <p className="mt-2">Upload your resume and job description for instant feedback</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error}
          </div>
        )}
        
        <ResumeUpload onAnalyze={handleAnalysis} loading={loading} />
        
        {results && <AnalysisResults results={results} />}
      </main>

      <footer className="bg-gray-100 py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>AI Resume Reviewer © {new Date().getFullYear()}</p>
        </div>
      </footer>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;