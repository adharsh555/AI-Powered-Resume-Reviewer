import React from 'react';
import KeywordHighlighter from './KeywordHighlighter';

const AnalysisResults = ({ results }) => {
  const { overall_score, grammar_feedback, tone_feedback, keyword_analysis, suggestions } = results;

  const getScoreColor = () => {
    if (overall_score >= 80) return 'text-green-600';
    if (overall_score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Resume Analysis Report</h2>
      
      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Overall Score</h3>
        <div className={`text-6xl font-bold ${getScoreColor()}`}>
          {overall_score}%
        </div>
        <p className="text-gray-600 mt-2">
          {overall_score >= 80 
            ? "Excellent! Your resume is well-optimized" 
            : overall_score >= 60 
              ? "Good, but could use some improvements" 
              : "Needs significant improvements"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Grammar Check</h3>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="text-gray-700">{grammar_feedback}</p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
          <h3 className="text-lg font-medium text-purple-800 mb-3">Tone Analysis</h3>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="text-gray-700 capitalize">
              {tone_feedback.sentiment} ({(tone_feedback.confidence * 100).toFixed(1)}% confidence)
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {tone_feedback.sentiment === "positive" 
                ? "Your resume has a professional tone" 
                : "Consider using more professional language"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-5 text-gray-800">Keyword Matching</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium text-green-700 mb-3">
              ✅ Matched Keywords ({keyword_analysis.matched.length})
            </h4>
            <KeywordHighlighter 
              keywords={keyword_analysis.matched} 
              color="bg-green-100 text-green-800" 
            />
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-red-700 mb-3">
              ❌ Missing Keywords ({keyword_analysis.missing.length})
            </h4>
            <KeywordHighlighter 
              keywords={keyword_analysis.missing} 
              color="bg-red-100 text-red-800" 
            />
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-bold mb-4 text-yellow-800">Suggestions for Improvement</h3>
        {suggestions.length > 0 ? (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-2 mt-1">•</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600 font-medium">
            Great job! No major suggestions. Your resume looks well-optimized.
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;