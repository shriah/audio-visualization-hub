
import React from 'react';
import { ConnectivityResults, PreflightTestReport } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, WifiOff, Wifi, Clock } from 'lucide-react';

interface ConnectivityStatusProps {
  connectivityResults: ConnectivityResults;
  preflightReport?: PreflightTestReport;
}

const ConnectivityStatus: React.FC<ConnectivityStatusProps> = ({ 
  connectivityResults, 
  preflightReport 
}) => {
  // Helper function to render status icons
  const renderStatusIcon = (status: string) => {
    if (status === 'operational' || status === 'Reachable' || status === 'success') {
      return <Check className="h-4 w-4 text-green-500" />;
    } else if (status === 'degraded') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    } else {
      return <WifiOff className="h-4 w-4 text-red-500" />;
    }
  };

  // Determine which format we're dealing with
  const isNewFormat = 'signalConnection' in connectivityResults;
  
  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <Wifi className="h-4 w-4 text-green-600 dark:text-green-300" />
          </div>
          <CardTitle>Connectivity Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!isNewFormat && preflightReport && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-muted-foreground mb-1 text-sm">DTLS Connection</div>
              <div className="font-medium">{preflightReport.report.networkTiming.dtls.duration}ms</div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-muted-foreground mb-1 text-sm">ICE Connection</div>
              <div className="font-medium">{preflightReport.report.networkTiming.ice.duration}ms</div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-muted-foreground mb-1 text-sm">Connection Time</div>
              <div className="font-medium">{preflightReport.report.networkTiming.connect.duration}ms</div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-muted-foreground mb-1 text-sm">Media Setup</div>
              <div className="font-medium">{preflightReport.report.networkTiming.media.duration}ms</div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="text-sm font-medium">Service Status</div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(connectivityResults).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/10 border border-gray-100 dark:border-gray-800">
                <div className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="flex items-center">
                  {renderStatusIcon(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectivityStatus;
