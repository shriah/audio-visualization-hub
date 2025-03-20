
import React from 'react';
import { QualityResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QualityMetricsProps {
  data?: QualityResults;
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({ data }) => {
  if (!data) return null;

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
                <div className="font-medium">{data.audio.jitter.toFixed(6)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium">{data.audio.packetLoss}%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium">
                  {isNaN(parseFloat(data.audio.RTT.avg)) ? 'N/A' : `${parseFloat(data.audio.RTT.avg).toFixed(2)} ms`}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium">{parseFloat(data.audio.RTT.max).toFixed(2)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium">{(parseFloat(data.audio.bitrate.avg) / 1000).toFixed(2)} Kbps</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium">{(parseFloat(data.audio.bitrate.max) / 1000).toFixed(2)} Kbps</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Jitter</div>
                <div className="font-medium">{data.video.jitter.toFixed(6)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium">{data.video.packetLoss}%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium">{parseFloat(data.video.RTT.avg).toFixed(2)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium">{parseFloat(data.video.RTT.max).toFixed(2)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium">{(parseFloat(data.video.bitrate.avg) / 1000).toFixed(2)} Kbps</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium">{(parseFloat(data.video.bitrate.max) / 1000).toFixed(2)} Kbps</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QualityMetrics;
