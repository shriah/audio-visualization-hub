
import React from 'react';
import { BitrateTestResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Network, AlertTriangle, Check, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BitrateChartProps {
  data: BitrateTestResults;
}

const BitrateChart: React.FC<BitrateChartProps> = ({ data }) => {
  const { values, testTiming, maxBitrate, averageBitrate } = data;
  
  const formattedTime = formatDistanceToNow(new Date(testTiming.start), { addSuffix: true });
  
  // Create data for the chart
  const chartData = values.map((value, index) => ({
    index,
    bitrate: value / 1000, // Convert to Kbps for readability
  }));
  
  // Define thresholds for bitrate quality
  // 500 Kbps is considered minimum for good video quality
  const isAverageBitrateGood = averageBitrate >= 500000;
  // 1000 Kbps (1 Mbps) is considered good for HD video
  const isMaxBitrateGood = maxBitrate >= 1000000;
  
  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Network className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
            <CardTitle>Bitrate Test</CardTitle>
          </div>
          <div className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
            {formattedTime}
          </div>
        </div>
        <CardDescription>
          Media Connection Bitrate Test
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-muted-foreground mb-1 text-sm">Max Bitrate</div>
            <div className="font-medium flex items-center gap-1">
              {(maxBitrate / 1000).toFixed(2)} Kbps
              {!isMaxBitrateGood && (
                <span className="tooltip-wrapper" title="Max bitrate is lower than recommended (1000 Kbps)">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>
              )}
              {isMaxBitrateGood && (
                <span className="tooltip-wrapper" title="Max bitrate is good">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              )}
            </div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-muted-foreground mb-1 text-sm">Average Bitrate</div>
            <div className="font-medium flex items-center gap-1">
              {(averageBitrate / 1000).toFixed(2)} Kbps
              {!isAverageBitrateGood && (
                <span className="tooltip-wrapper" title="Average bitrate is lower than recommended (500 Kbps)">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>
              )}
              {isAverageBitrateGood && (
                <span className="tooltip-wrapper" title="Average bitrate is good">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              )}
            </div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="text-muted-foreground mb-1 text-sm">Test Status</div>
            <div className="font-medium flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${data.errors.length === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {data.errors.length === 0 ? (
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
        
        <div className="h-64 w-full bg-secondary/30 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="bitrateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="index" 
                label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ value: 'Kbps', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: any) => {
                  // Ensure value is a number before calling toFixed
                  return typeof value === 'number' 
                    ? [`${value.toFixed(2)} Kbps`, 'Bitrate'] 
                    : [`${value}`, 'Bitrate'];
                }}
                labelFormatter={(label) => `Sample ${label}`}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="bitrate" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#bitrateGradient)" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitrateChart;
