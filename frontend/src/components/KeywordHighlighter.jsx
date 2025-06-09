import React from 'react';

const KeywordHighlighter = ({ keywords, color }) => {
  if (keywords.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        {color.includes('red') ? "No missing keywords" : "No matched keywords"}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span 
          key={index} 
          className={`px-3 py-2 rounded-lg text-sm font-medium ${color}`}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordHighlighter;