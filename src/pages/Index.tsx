
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FileImport from "@/components/FileImport";
import { TestResults } from "@/types/TestResults";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const handleFileImport = (data: TestResults) => {
    // Store the data in sessionStorage
    sessionStorage.setItem('testResults', JSON.stringify(data));
    
    // Navigate to the results page
    navigate('/results');
  };

  return (
    <div className="container mx-auto py-10 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">WebRTC Test Results Analyzer</h1>
      <p className="text-lg text-center text-muted-foreground mb-10 max-w-2xl">
        Import your test results file to analyze WebRTC connectivity, audio/video device performance, and network quality.
      </p>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Import Test Results</CardTitle>
          <CardDescription>
            Upload a JSON file with your test results to begin analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileImport onImport={handleFileImport} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/documentation')} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            View Documentation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
