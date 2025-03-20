
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="neo-card p-8 max-w-md w-full text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved
        </p>
        
        <Button asChild className="flex items-center gap-1">
          <a href="/">
            <ChevronLeft className="h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
