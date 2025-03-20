import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, FileJson, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TestResults } from '@/types/TestResults';

interface FileImportProps {
  onImport: (data: TestResults) => void;
}

const FileImport: React.FC<FileImportProps> = ({ onImport }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const parseAndValidateFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        // Unified validation for both formats
        if (isValidTestResults(data)) {
          // Normalize the data format before passing it
          const normalizedData = normalizeTestResults(data);
          onImport(normalizedData);
          toast.success('File imported successfully');
        } else {
          toast.error('Invalid file format. Please import a valid test results file.');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error('Failed to parse file. Please ensure it is a valid JSON file.');
      } finally {
        setIsLoading(false);
        setIsDragging(false);
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setIsLoading(false);
      setIsDragging(false);
    };

    reader.readAsText(file);
  };

  // Function to validate if the data is in the expected format
  const isValidTestResults = (data: any): data is TestResults => {
    // Required fields for all formats
    return data.audioTestResults?.inputTest && 
           data.browserInformation && 
           data.videoTestResults && 
           (data.connectivityResults || data.qualityResults);
  };

  // Function to normalize the data to a single format
  const normalizeTestResults = (data: any): TestResults => {
    // We don't modify the data itself, just ensuring it has the shape we expect
    return data as TestResults;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        parseAndValidateFile(file);
      } else {
        toast.error('Please import a JSON file');
        setIsDragging(false);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      parseAndValidateFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDemoDataClick = () => {
    setIsLoading(true);
    fetch('/demoData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Demo data not available');
        }
        return response.json();
      })
      .then(data => {
        if (isValidTestResults(data)) {
          const normalizedData = normalizeTestResults(data);
          onImport(normalizedData);
          toast.success('Demo data loaded successfully');
        } else {
          throw new Error('Invalid demo data format');
        }
      })
      .catch(error => {
        console.error('Error loading demo data:', error);
        // Use the example data from the original JSON instead
        const demoData = {
          "audioTestResults": {
            "inputTest": {
              "deviceId": "default",
              "errors": [],
              "testName": "audio-input-test",
              "values": [3.3125, 10.84375, 9.15625, 8.09375, 6.84375, 5.15625, 5.75, 8.625, 8.09375, 8.375, 7.46875, 5.65625, 7.46875, 6.78125, 4.625, 4.8125, 8.15625, 7.0625],
              "testTiming": {
                "duration": 1905,
                "end": 1740580752377,
                "start": 1740580750472
              }
            },
            "outputTest": null
          },
          "browserInformation": {
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
            "browser": {
              "name": "Edge",
              "version": "133.0.0.0",
              "major": "133"
            },
            "engine": {
              "name": "Blink",
              "version": "133.0.0.0"
            },
            "os": {
              "name": "Mac OS",
              "version": "10.15.7"
            },
            "device": {
              "vendor": "Apple",
              "model": "Macintosh"
            },
            "cpu": {}
          },
          "connectivityResults": {
            "groupRooms": "operational",
            "peerToPeerRooms": "operational",
            "recordings": "operational",
            "compositions": "operational",
            "networkTraversalService": "operational",
            "goRooms": "operational",
            "signalingRegion": "Reachable",
            "turn": "Reachable"
          },
          "videoTestResults": {
            "deviceId": "caca0b3986b55a20d7310dc4475772b578266cec71e4c6d813c3e086c06c029b",
            "errors": [],
            "resolution": {
              "width": 640,
              "height": 480
            },
            "testName": "video-input-test",
            "testTiming": {
              "duration": 12161,
              "end": 1740580750312,
              "start": 1740580738151
            }
          }
        };
        const normalizedData = normalizeTestResults(demoData);
        onImport(normalizedData);
        toast.success('Demo data loaded successfully');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className={cn(
          "w-full max-w-2xl h-64 rounded-2xl border-2 border-dashed transition-all duration-300 ease-apple",
          "flex flex-col items-center justify-center p-6 cursor-pointer",
          "bg-secondary/50 backdrop-blur-sm",
          isDragging ? "border-primary scale-[1.02] shadow-lg border-opacity-100" : "border-secondary border-opacity-70",
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="animate-slide-up">
          <div className={cn(
            "w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-secondary",
            isDragging ? "bg-primary/10" : ""
          )}>
            <Upload
              className={cn(
                "w-8 h-8 transition-all duration-300",
                isDragging ? "text-primary scale-110" : "text-muted-foreground"
              )}
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-center">
            {isDragging ? "Release to Import" : "Import Test Results"}
          </h3>
          
          <p className="text-muted-foreground text-center max-w-md">
            Drag and drop your JSON file here, or click to select a file
          </p>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept=".json,application/json" 
            onChange={handleFileInputChange}
          />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDemoDataClick}
          disabled={isLoading}
          className="flex items-center gap-2 transition-all duration-200 hover:shadow-md"
        >
          <FileJson className="h-4 w-4" />
          <span>Use Demo Data</span>
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowRight className="h-4 w-4" />
          <span>Visualize in seconds</span>
        </div>
      </div>
    </div>
  );
};

export default FileImport;
