import React from 'react';

const ResultsPage = ({ results, handleBack, handleRestart, history }) => {
  const renderResults = () => {
    return (
      <div>
        <h2>Results</h2>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.question}</h3>
            <p>Here is how to {result.question.toLowerCase()}! Follow these steps...</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderResults()}
      {history.length > 0 && (
        <button onClick={handleBack}>Back</button>
      )}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default ResultsPage;