
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestResults } from "@/types/TestResults";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResults | null>(null);

  useEffect(() => {
    // Get the results from sessionStorage
    const storedResults = sessionStorage.getItem('testResults');
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
      } catch (error) {
        console.error('Error parsing results:', error);
        toast({
          title: "Error",
          description: "Failed to load test results. Please try again.",
          variant: "destructive",
        });
        navigate('/');
      }
    } else {
      // If no results are stored, redirect to the home page
      navigate('/');
    }
  }, [navigate]);

  const handleExport = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'webrtc-test-results.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!results) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Test Results</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/documentation')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Documentation
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <ResultsDisplay data={results} />
    </div>
  );
}
