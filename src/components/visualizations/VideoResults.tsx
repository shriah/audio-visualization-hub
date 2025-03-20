
import React from 'react';
import { VideoTestResults, QualityResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Video, Film, LineChart } from 'lucide-react';

interface VideoResultsProps {
  videoTest: VideoTestResults;
  qualityResults?: QualityResults;
}

const VideoResults: React.FC<VideoResultsProps> = ({ videoTest, qualityResults }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="neo-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Video className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <CardTitle>Video Test Results</CardTitle>
          </div>
          <CardDescription>
            Camera capabilities and video quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Video Device</h3>
              <div className="space-y-2">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground mb-1 text-sm">Device ID</div>
                  <div className="font-mono text-xs break-all">{videoTest.deviceId}</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground mb-1 text-sm">Test Duration</div>
                  <div className="font-medium">{(videoTest.testTiming.duration / 1000).toFixed(2)} seconds</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resolution</h3>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                  <Film className="h-12 w-12 text-muted-foreground/50" />
                  <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded text-sm">
                    {videoTest.resolution.width} × {videoTest.resolution.height}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Aspect Ratio:</span>
                  <span className="font-medium">{(videoTest.resolution.width / videoTest.resolution.height).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Status</h3>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1 text-sm">Status</div>
                <div className="font-medium flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${videoTest.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {videoTest.errors.length === 0 ? 'Passed' : 'Failed'}
                </div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1 text-sm">Test Name</div>
                <div className="font-medium">{videoTest.testName}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {qualityResults && (
        <Card className="neo-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <LineChart className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle>Video Quality Metrics</CardTitle>
            </div>
            <CardDescription>
              Network performance and quality indicators for video
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Jitter</div>
                <div className="font-medium">{qualityResults.video.jitter.toFixed(6)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium">{qualityResults.video.packetLoss}%</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium">{parseFloat(qualityResults.video.RTT.avg).toFixed(2)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium">{parseFloat(qualityResults.video.RTT.max).toFixed(2)} ms</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium">{(parseFloat(qualityResults.video.bitrate.avg) / 1000).toFixed(2)} Kbps</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium">{(parseFloat(qualityResults.video.bitrate.max) / 1000).toFixed(2)} Kbps</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Quality Assessment</h3>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Bitrate Quality</div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-green-500" 
                        style={{ 
                          width: `${Math.min((parseFloat(qualityResults.video.bitrate.avg) / 5000000) * 100, 100)}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Network Stability</div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-green-500" 
                        style={{ 
                          width: `${Math.max(100 - (qualityResults.video.jitter * 2000) - (qualityResults.video.packetLoss * 5), 0)}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Poor</span>
                      <span>Stable</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="neo-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle>Test Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="text-sm">
                Test Started: {new Date(videoTest.testTiming.start).toLocaleTimeString()}
              </div>
            </div>
            <div className="w-0.5 h-8 bg-muted ml-1.5"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-sm">
                Test Completed: {new Date(videoTest.testTiming.end).toLocaleTimeString()}
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">Total Duration:</div>
              <div className="font-medium">{(videoTest.testTiming.duration / 1000).toFixed(2)} seconds</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoResults;
