
import React from 'react';
import { BrowserInformation } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, MonitorSmartphone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DeviceInfoProps {
  browserInfo: BrowserInformation;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ browserInfo }) => {
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
          
          <Separator className="my-4" />
          
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">User Agent:</div>
            <div className="p-2 rounded bg-secondary/50 overflow-x-auto">
              <code>{browserInfo.ua}</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceInfo;
