
import React from 'react';
import { BrowserInformation, VideoTestResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, MonitorSmartphone, Video } from 'lucide-react';

interface DeviceInfoProps {
  browserInfo: BrowserInformation;
  videoTest: VideoTestResults;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ browserInfo, videoTest }) => {
  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <Laptop className="h-4 w-4 text-orange-600 dark:text-orange-300" />
          </div>
          <CardTitle>Device Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MonitorSmartphone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">System Information</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Browser</span>
                <span className="text-sm font-medium">{browserInfo.browser.name} {browserInfo.browser.major}</span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">OS</span>
                <span className="text-sm font-medium">{browserInfo.os.name} {browserInfo.os.version}</span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Device</span>
                <span className="text-sm font-medium">
                  {browserInfo.device.vendor || 'Unknown'} {browserInfo.device.model || ''}
                </span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Engine</span>
                <span className="text-sm font-medium">{browserInfo.engine.name} {browserInfo.engine.version}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Video Capabilities</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Resolution</span>
                <span className="text-sm font-medium">{videoTest.resolution.width} × {videoTest.resolution.height}</span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Test Duration</span>
                <span className="text-sm font-medium">{(videoTest.testTiming.duration / 1000).toFixed(2)}s</span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${videoTest.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {videoTest.errors.length === 0 ? 'Passed' : 'Failed'}
                </span>
              </div>
              
              <div className="flex justify-between p-2 rounded bg-secondary/50">
                <span className="text-sm text-muted-foreground">Device ID</span>
                <span className="text-sm text-muted-foreground truncate max-w-[150px]" title={videoTest.deviceId}>
                  {videoTest.deviceId.substring(0, 12)}...
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">User Agent:</div>
          <div className="p-2 rounded bg-secondary/50 overflow-x-auto">
            <code>{browserInfo.ua}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceInfo;
