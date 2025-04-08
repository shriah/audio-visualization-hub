
import React from 'react';
import { VideoTestResults, QualityResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Video, Film, LineChart, AlertTriangle, Check, Info } from 'lucide-react';

interface VideoResultsProps {
  videoTest: VideoTestResults;
  qualityResults?: QualityResults;
}

const VideoResults: React.FC<VideoResultsProps> = ({ videoTest, qualityResults }) => {
  // Define thresholds for video resolution quality
  // HD resolution is typically 1280x720 or better
  const isHDResolution = videoTest.resolution.width >= 1280 && videoTest.resolution.height >= 720;
  // Full HD resolution is 1920x1080 or better
  const isFullHDResolution = videoTest.resolution.width >= 1920 && videoTest.resolution.height >= 1080;
  
  // Helper function to get resolution quality status
  const getResolutionQualityStatus = () => {
    if (isFullHDResolution) {
      return {
        icon: <Check className="h-4 w-4 text-green-500 ml-1" />,
        label: "Full HD or better",
        tooltip: "Resolution is Full HD (1920x1080) or better"
      };
    } else if (isHDResolution) {
      return {
        icon: <Check className="h-4 w-4 text-green-500 ml-1" />,
        label: "HD",
        tooltip: "Resolution is HD (1280x720) or better"
      };
    } else {
      return {
        icon: <AlertTriangle className="h-4 w-4 text-amber-500 ml-1" />,
        label: "SD",
        tooltip: "Resolution is below HD (1280x720)"
      };
    }
  };
  
  const resolutionStatus = getResolutionQualityStatus();

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
                  <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded text-sm flex items-center gap-1">
                    {videoTest.resolution.width} × {videoTest.resolution.height}
                    <span className="tooltip-wrapper" title={resolutionStatus.tooltip}>
                      {resolutionStatus.icon}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Aspect Ratio:</span>
                  <span className="font-medium">{(videoTest.resolution.width / videoTest.resolution.height).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quality:</span>
                  <span className="font-medium flex items-center">
                    {resolutionStatus.label}
                    {resolutionStatus.icon}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Status</h3>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1 text-sm">Status</div>
                <div className="font-medium flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${videoTest.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {videoTest.errors.length === 0 ? (
                    <>
                      Passed
                      <Check className="h-4 w-4 text-green-500 ml-1" />
                    </>
                  ) : (
                    <>
                      Failed
                      <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
                    </>
                  )}
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
                <div className="font-medium flex items-center gap-1">
                  {qualityResults.video.jitter.toFixed(6)} ms
                  {qualityResults.video.jitter > 30 ? (
                    <span className="tooltip-wrapper" title="Jitter is higher than recommended (<30ms)">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Jitter is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Packet Loss</div>
                <div className="font-medium flex items-center gap-1">
                  {qualityResults.video.packetLoss}%
                  {qualityResults.video.packetLoss > 1 ? (
                    <span className="tooltip-wrapper" title={`Packet loss is ${qualityResults.video.packetLoss > 5 ? 'critically' : ''} higher than recommended (<1%)`}>
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Packet loss is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {parseFloat(qualityResults.video.RTT.avg).toFixed(2)} ms
                  {parseFloat(qualityResults.video.RTT.avg) > 200 ? (
                    <span className="tooltip-wrapper" title="Average RTT is higher than recommended (<200ms)">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Average RTT is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max RTT</div>
                <div className="font-medium flex items-center gap-1">
                  {parseFloat(qualityResults.video.RTT.max).toFixed(2)} ms
                  {parseFloat(qualityResults.video.RTT.max) > 300 ? (
                    <span className="tooltip-wrapper" title="Maximum RTT is higher than recommended (<300ms)">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Maximum RTT is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Avg Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(qualityResults.video.bitrate.avg) / 1000).toFixed(2)} Kbps
                  {parseFloat(qualityResults.video.bitrate.avg) < 500000 ? (
                    <span className="tooltip-wrapper" title="Average bitrate is lower than recommended (>500 Kbps)">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Average bitrate is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
                <div className="font-medium flex items-center gap-1">
                  {(parseFloat(qualityResults.video.bitrate.max) / 1000).toFixed(2)} Kbps
                  {parseFloat(qualityResults.video.bitrate.max) < 1000000 ? (
                    <span className="tooltip-wrapper" title="Maximum bitrate is lower than recommended (>1000 Kbps)">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </span>
                  ) : (
                    <span className="tooltip-wrapper" title="Maximum bitrate is within acceptable range">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </div>
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
