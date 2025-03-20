import React from 'react';
import { TestResults } from '@/types/TestResults';
import AudioVisualizer from './visualizations/AudioVisualizer';
import BitrateChart from './visualizations/BitrateChart';
import ConnectivityStatus from './visualizations/ConnectivityStatus';
import DeviceInfo from './visualizations/DeviceInfo';
import ICECandidates from './visualizations/ICECandidates';
import QualityMetrics from './visualizations/QualityMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AudioLines, BarChart3, Wifi, Laptop, Radio, Video } from 'lucide-react';
import VideoResults from './visualizations/VideoResults';

interface ResultsDisplayProps {
  data: TestResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  // Helper functions for component rendering
  const renderNetworkVisualizations = () => {
    if (data.qualityResults) {
      return <QualityMetrics data={data.qualityResults} />;
    } else if (data.bitrateTestResults) {
      return <BitrateChart data={data.bitrateTestResults} />;
    }
    return null;
  };
  
  const renderICECandidates = () => {
    if (data.bitrateTestResults) {
      return <ICECandidates data={data.bitrateTestResults} />;
    }
    return (
      <div className="p-6 bg-secondary/30 rounded-xl text-center">
        <h3 className="text-xl font-semibold mb-2">ICE Candidates Not Available</h3>
        <p className="text-muted-foreground">
          Detailed ICE candidate information is not available in this test result format.
        </p>
      </div>
    );
  };
  
  const renderNetworkStatistics = () => {
    if (!data.preflightTestReport) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="neo-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Network Statistics</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Average Jitter</div>
                <div className="font-medium">
                  {data.preflightTestReport.report.stats.jitter.average.toFixed(3)} ms
                </div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Average RTT</div>
                <div className="font-medium">
                  {data.preflightTestReport.report.stats.rtt.average.toFixed(1)} ms
                </div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Packet Loss</div>
                <div className="font-medium">
                  {data.preflightTestReport.report.stats.packetLoss.average}%
                </div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">MOS Score</div>
                <div className="font-medium">
                  {data.preflightTestReport.report.mos.average.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="neo-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Connection Timeline</h3>
          <div className="space-y-4">
            {data.preflightTestReport.report.progressEvents.map((event, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-xs text-right mr-4 text-muted-foreground">
                  {event.duration} ms
                </div>
                <div className="h-2 bg-primary/20 flex-grow relative">
                  <div 
                    className="absolute h-2 bg-primary left-0 top-0" 
                    style={{ 
                      width: `${(event.duration / data.preflightTestReport.report.testTiming.duration) * 100}%` 
                    }}
                  />
                </div>
                <div className="ml-4 text-sm">
                  {event.name.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderMediaQuality = () => {
    if (!data.qualityResults) return null;
    
    return (
      <div className="neo-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Media Quality</h3>
        <p className="text-muted-foreground mb-4">
          The quality metrics show the performance of audio and video streams during the test.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium">Audio Quality</h4>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-2 bg-green-500" 
                style={{ width: '95%' }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Video Quality</h4>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-2 bg-green-500" 
                style={{ width: '90%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Test Results</h2>
          <p className="text-muted-foreground">
            Detailed analysis of audio, network, and device capabilities
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <AudioLines className="h-4 w-4" />
            <span>Audio</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span>Network</span>
          </TabsTrigger>
          <TabsTrigger value="device" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>Device</span>
          </TabsTrigger>
          <TabsTrigger value="ice" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            <span>ICE</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AudioVisualizer data={data.audioTestResults} />
            {renderNetworkVisualizations()}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConnectivityStatus 
              connectivityResults={data.connectivityResults} 
              preflightReport={data.preflightTestReport} 
            />
            <DeviceInfo 
              browserInfo={data.browserInformation}
              videoTest={data.videoTestResults}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="mt-0 animate-slide-up">
          <div className="grid grid-cols-1 gap-6">
            <AudioVisualizer data={data.audioTestResults} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neo-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Audio Test Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Device ID</div>
                    <div className="font-mono text-sm bg-secondary/50 p-2 rounded">
                      {data.audioTestResults.inputTest.deviceId}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Test Duration</div>
                    <div>
                      {(data.audioTestResults.inputTest.testTiming.duration / 1000).toFixed(2)} seconds
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Sample Count</div>
                    <div>
                      {data.audioTestResults.inputTest.values.length} samples
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Test Time Range</div>
                    <div>
                      {new Date(data.audioTestResults.inputTest.testTiming.start).toLocaleTimeString()} - {new Date(data.audioTestResults.inputTest.testTiming.end).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="neo-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Audio Levels Data</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Min</div>
                      <div className="font-medium">
                        {Math.min(...data.audioTestResults.inputTest.values).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Max</div>
                      <div className="font-medium">
                        {Math.max(...data.audioTestResults.inputTest.values).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Avg</div>
                      <div className="font-medium">
                        {(data.audioTestResults.inputTest.values.reduce((a, b) => a + b, 0) / data.audioTestResults.inputTest.values.length).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className="font-medium flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${data.audioTestResults.inputTest.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {data.audioTestResults.inputTest.errors.length === 0 ? 'Passed' : 'Failed'}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Raw Values</div>
                    <div className="max-h-32 overflow-y-auto bg-secondary/50 p-2 rounded text-xs font-mono">
                      {JSON.stringify(data.audioTestResults.inputTest.values, null, 2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="network" className="mt-0 animate-slide-up">
          <div className="grid grid-cols-1 gap-6">
            {renderNetworkVisualizations()}
            <ConnectivityStatus 
              connectivityResults={data.connectivityResults} 
              preflightReport={data.preflightTestReport} 
            />
            {renderNetworkStatistics()}
            {renderMediaQuality()}
          </div>
        </TabsContent>
        
        <TabsContent value="device" className="mt-0 animate-slide-up">
          <DeviceInfo 
            browserInfo={data.browserInformation}
            videoTest={data.videoTestResults}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="neo-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Video Test Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Resolution</div>
                  <div className="font-medium">
                    {data.videoTestResults.resolution.width} × {data.videoTestResults.resolution.height}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Device ID</div>
                  <div className="font-mono text-sm bg-secondary/50 p-2 rounded overflow-x-auto">
                    {data.videoTestResults.deviceId}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Test Duration</div>
                  <div>
                    {(data.videoTestResults.testTiming.duration / 1000).toFixed(2)} seconds
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Test Time Range</div>
                  <div>
                    {new Date(data.videoTestResults.testTiming.start).toLocaleTimeString()} - {new Date(data.videoTestResults.testTiming.end).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="neo-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Browser Capabilities</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Browser</div>
                    <div className="font-medium">
                      {data.browserInformation.browser.name} {data.browserInformation.browser.version}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Operating System</div>
                    <div className="font-medium">
                      {data.browserInformation.os.name} {data.browserInformation.os.version}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Device</div>
                    <div className="font-medium">
                      {data.browserInformation.device.vendor || ''} {data.browserInformation.device.model || 'Unknown Device'}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Rendering Engine</div>
                    <div className="font-medium">
                      {data.browserInformation.engine.name} {data.browserInformation.engine.version}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ice" className="mt-0 animate-slide-up">
          {renderICECandidates()}
        </TabsContent>
        
        <TabsContent value="video" className="mt-0 animate-slide-up">
          <VideoResults videoTest={data.videoTestResults} qualityResults={data.qualityResults} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
