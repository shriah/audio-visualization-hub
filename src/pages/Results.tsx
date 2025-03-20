
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultsDisplay from '@/components/ResultsDisplay';
import { TestResults } from '@/types/TestResults';
import { ChevronLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testResults = location.state?.testResults as TestResults | null;

  // Redirect to home if no results are available
  React.useEffect(() => {
    if (!testResults) {
      navigate('/', { replace: true });
    }
  }, [testResults, navigate]);

  if (!testResults) {
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleExport = () => {
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
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
        </div>
      </header>
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ResultsDisplay data={testResults} />
        </div>
      </main>
    </div>
  );
};

export default Results;
