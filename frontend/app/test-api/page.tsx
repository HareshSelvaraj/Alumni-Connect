"use client";

import { useState } from "react";

export default function TestAPI() {
  const [result, setResult] = useState<string>("");

  const testAPI = async () => {
    setResult("Testing...");
    try {
      const response = await fetch('http://localhost:3005/api/health');
      const data = await response.json();
      setResult(`✅ SUCCESS: ${JSON.stringify(data)}`);
    } catch (error: any) {
      setResult(`❌ ERROR: ${error.message}`);
    }
  };

  const testFilters = async () => {
    setResult("Testing filters...");
    try {
      const response = await fetch('http://localhost:3005/api/search/filters');
      const data = await response.json();
      setResult(`✅ FILTERS SUCCESS: ${JSON.stringify(data)}`);
    } catch (error: any) {
      setResult(`❌ FILTERS ERROR: ${error.message}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <div className="space-y-4">
        <button 
          onClick={testAPI}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Health Endpoint
        </button>
        <button 
          onClick={testFilters}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Test Filters Endpoint
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      </div>
    </div>
  );
} 