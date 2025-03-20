
import React, { useState } from 'react';
import FileImport from '@/components/FileImport';
import ResultsDisplay from '@/components/ResultsDisplay';
import { TestResults } from '@/types/TestResults';
import { ChevronLeft, ChevronRight, AlertCircle, Download, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const handleImport = (data: TestResults) => {
    setTestResults(data);
  };

  const handleReset = () => {
    setTestResults(null);
  };

  const handleExport = () => {
    if (!testResults) return;

    const dataStr = JSON.stringify(testResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `test-results-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Results exported successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <AudioLines className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Audio Visualization Hub</h1>
          </div>
          
          {testResults && (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          {testResults ? (
            <ResultsDisplay data={testResults} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-slide-down">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Audio Test Visualization</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Import your JSON test results to visualize audio metrics, network statistics, and device information.
                </p>
              </div>
              
              <FileImport onImport={handleImport} />
              
              <div className="mt-16 p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">About This Tool</h3>
                    <p className="text-sm text-muted-foreground">
                      This visualization tool helps you understand and analyze audio test results. 
                      Import your JSON test data to see detailed metrics on audio input/output, 
                      network connectivity, bitrate, and device capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Audio Visualization Hub
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
