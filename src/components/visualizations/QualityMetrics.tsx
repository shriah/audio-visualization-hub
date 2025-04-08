
import React from 'react';
import { QualityResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, AlertTriangle, Check, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface QualityMetricsProps {
  data?: QualityResults;
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({ data }) => {
  if (!data) return null;

  // Define threshold values for quality metrics
  const thresholds = {
    jitter: { warning: 30, critical: 50 }, // ms
    packetLoss: { warning: 1, critical: 5 }, // %
    rtt: { warning: 200, critical: 300 }, // ms
    bitrate: { 
      audio: { warning: 30000, critical: 20000 }, // bps
      video: { warning: 500000, critical: 250000 } // bps
    }
  };

  // Helper function to render status icon based on value and thresholds
  const renderStatusIcon = (value: number, warningThreshold: number, criticalThreshold: number, higherIsBetter: boolean = false) => {
    if (higherIsBetter) {
      // For metrics where higher values are better (like bitrate)
      if (value < criticalThreshold) {
        return (
          <span className="tooltip-wrapper" title="Critical: Value is significantly below recommended range">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </span>
        );
      } else if (value < warningThreshold) {
        return (
          <span className="tooltip-wrapper" title="Warning: Value is below recommended range">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </span>
        );
      } else {
        return (
          <span className="tooltip-wrapper" title="Good: Value is within recommended range">
            <Check className="h-4 w-4 text-green-500" />
          </span>
        );
      }
    } else {
      // For metrics where lower values are better (like jitter, packet loss, RTT)
      if (value > criticalThreshold) {
        return (
          <span className="tooltip-wrapper" title="Critical: Value is significantly above recommended range">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </span>
        );
      } else if (value > warningThreshold) {
        return (
          <span className="tooltip-wrapper" title="Warning: Value is above recommended range">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </span>
        );
      } else {
        return (
          <span className="tooltip-wrapper" title="Good: Value is within recommended range">
            <Check className="h-4 w-4 text-green-500" />
          </span>
        );
      }
    }
  };

  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
          </div>
          <CardTitle>Quality Metrics</CardTitle>
        </div>
        <CardDescription>
          Audio and Video Quality Results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audio" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Jitter</div>
                <div className="font-medium flex items-center gap-1">
                  {data.audio.jitter.toFixed(6)} ms
                  {renderStatusIcon(data.audio.jitter, thresholds.jitter.warning, thresholds.jitter.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium flex items-center gap-1">
                  {data.audio.packetLoss}%
                  {renderStatusIcon(data.audio.packetLoss, thresholds.packetLoss.warning, thresholds.packetLoss.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {isNaN(parseFloat(data.audio.RTT.avg)) ? 'N/A' : (
                    <>
                      {parseFloat(data.audio.RTT.avg).toFixed(2)} ms
                      {!isNaN(parseFloat(data.audio.RTT.avg)) && 
                        renderStatusIcon(parseFloat(data.audio.RTT.avg), thresholds.rtt.warning, thresholds.rtt.critical)}
                    </>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {parseFloat(data.audio.RTT.max).toFixed(2)} ms
                  {renderStatusIcon(parseFloat(data.audio.RTT.max), thresholds.rtt.warning, thresholds.rtt.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(data.audio.bitrate.avg) / 1000).toFixed(2)} Kbps
                  {renderStatusIcon(parseFloat(data.audio.bitrate.avg), 
                    thresholds.bitrate.audio.warning, 
                    thresholds.bitrate.audio.critical, 
                    true)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(data.audio.bitrate.max) / 1000).toFixed(2)} Kbps
                  {renderStatusIcon(parseFloat(data.audio.bitrate.max), 
                    thresholds.bitrate.audio.warning, 
                    thresholds.bitrate.audio.critical, 
                    true)}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Jitter</div>
                <div className="font-medium flex items-center gap-1">
                  {data.video.jitter.toFixed(6)} ms
                  {renderStatusIcon(data.video.jitter, thresholds.jitter.warning, thresholds.jitter.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium flex items-center gap-1">
                  {data.video.packetLoss}%
                  {renderStatusIcon(data.video.packetLoss, thresholds.packetLoss.warning, thresholds.packetLoss.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {parseFloat(data.video.RTT.avg).toFixed(2)} ms
                  {renderStatusIcon(parseFloat(data.video.RTT.avg), thresholds.rtt.warning, thresholds.rtt.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {parseFloat(data.video.RTT.max).toFixed(2)} ms
                  {renderStatusIcon(parseFloat(data.video.RTT.max), thresholds.rtt.warning, thresholds.rtt.critical)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(data.video.bitrate.avg) / 1000).toFixed(2)} Kbps
                  {renderStatusIcon(parseFloat(data.video.bitrate.avg), 
                    thresholds.bitrate.video.warning, 
                    thresholds.bitrate.video.critical, 
                    true)}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(data.video.bitrate.max) / 1000).toFixed(2)} Kbps
                  {renderStatusIcon(parseFloat(data.video.bitrate.max), 
                    thresholds.bitrate.video.warning, 
                    thresholds.bitrate.video.critical, 
                    true)}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QualityMetrics;
