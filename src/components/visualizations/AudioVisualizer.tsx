
import React from 'react';
import { AudioTestResults } from '@/types/TestResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, AlertTriangle, Check, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AudioVisualizerProps {
  data: AudioTestResults;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ data }) => {
  const { inputTest } = data;
  const { values, testTiming } = inputTest;
  
  // Find max value for normalization
  const maxValue = Math.max(...values);
  
  // Format the test time
  const formattedTime = formatDistanceToNow(new Date(testTiming.start), { addSuffix: true });
  
  // Calculate average audio level
  const averageLevel = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  // Check if average level is too low (below 0.1) or too high (above 0.9)
  const isAudioLevelInRange = averageLevel > 0.1 && averageLevel < 0.9;
  
  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Mic className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <CardTitle>Audio Input Test</CardTitle>
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
            {formattedTime}
          </div>
        </div>
        <CardDescription>
          Device ID: {inputTest.deviceId || 'Default Device'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Audio Levels</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Avg: {averageLevel.toFixed(2)}
              {!isAudioLevelInRange && (
                <span className="tooltip-wrapper" title={averageLevel < 0.1 ? "Audio level too low" : "Audio level too high"}>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>
              )}
              {isAudioLevelInRange && (
                <span className="tooltip-wrapper" title="Audio level in good range">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              )}
            </span>
          </div>
          
          <div className="h-40 flex items-end justify-center gap-[2px] p-4 bg-secondary/50 rounded-xl">
            {values.map((value, index) => {
              // Normalize height between 10% and 100%
              const normalizedHeight = 10 + ((value / maxValue) * 90);
              
              // Generate a color based on value (higher values are more blue)
              const blueIntensity = Math.min(Math.floor((value / maxValue) * 255), 255);
              const backgroundColor = `rgb(${100 - blueIntensity/3}, ${140 - blueIntensity/4}, ${blueIntensity + 100})`;
              
              return (
                <div
                  key={index}
                  className="audio-bar group"
                  style={{
                    height: `${normalizedHeight}%`,
                    backgroundColor
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 text-xs bg-foreground text-background rounded px-1 py-0.5 transform -translate-x-1/2 left-1/2 pointer-events-none">
                    {value.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-muted-foreground mb-1">Duration</div>
            <div className="font-medium">{(testTiming.duration / 1000).toFixed(2)}s</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-muted-foreground mb-1">Test Status</div>
            <div className="font-medium flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${inputTest.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {inputTest.errors.length === 0 ? (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioVisualizer;
