
import React from 'react';
import { BitrateTestResults } from '@/types/TestResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio, Server } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ICECandidatesProps {
  data: BitrateTestResults;
}

const ICECandidates: React.FC<ICECandidatesProps> = ({ data }) => {
  const { selectedIceCandidatePairStats, iceCandidateStats } = data;
  
  // Group candidates by type
  const localCandidates = iceCandidateStats.filter(candidate => 
    candidate.type === 'local-candidate' || !candidate.isRemote
  );
  
  const remoteCandidates = iceCandidateStats.filter(candidate => 
    candidate.type === 'remote-candidate' || candidate.isRemote
  );
  
  // Function to render a single candidate row
  const renderCandidateRow = (candidate: any, index: number) => {
    const isSelected = 
      (candidate.id === selectedIceCandidatePairStats?.localCandidate?.id) || 
      (candidate.id === selectedIceCandidatePairStats?.remoteCandidate?.id);
      
    return (
      <div 
        key={index} 
        className={`p-3 rounded-lg mb-2 text-sm border ${
          isSelected 
            ? 'border-primary/50 bg-primary/5' 
            : 'border-transparent bg-secondary/50'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">
            {candidate.candidateType} 
            {isSelected && <span className="ml-2 text-xs text-primary">(Selected)</span>}
          </div>
          <div className="px-2 py-0.5 rounded-full bg-secondary text-xs">
            {candidate.protocol.toUpperCase()}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">IP Address</div>
            <div>{candidate.address || candidate.ip}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Port</div>
            <div>{candidate.port}</div>
          </div>
          {candidate.networkType && (
            <div>
              <div className="text-xs text-muted-foreground">Network</div>
              <div className="capitalize">{candidate.networkType}</div>
            </div>
          )}
          <div>
            <div className="text-xs text-muted-foreground">Priority</div>
            <div>{candidate.priority.toLocaleString()}</div>
          </div>
          {candidate.relatedAddress && (
            <div className="col-span-2">
              <div className="text-xs text-muted-foreground">Related Address</div>
              <div>{candidate.relatedAddress}:{candidate.relatedPort}</div>
            </div>
          )}
          {candidate.url && (
            <div className="col-span-2">
              <div className="text-xs text-muted-foreground">URL</div>
              <div className="truncate">{candidate.url}</div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card className="neo-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
            <Radio className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
          </div>
          <CardTitle>ICE Candidates</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="local" className="flex items-center gap-1">
              <Server className="h-3.5 w-3.5" />
              <span>Local ({localCandidates.length})</span>
            </TabsTrigger>
            <TabsTrigger value="remote" className="flex items-center gap-1">
              <Radio className="h-3.5 w-3.5" />
              <span>Remote ({remoteCandidates.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="mt-0">
            <ScrollArea className="h-80 rounded-lg">
              <div className="p-1">
                {localCandidates.map(renderCandidateRow)}
                {localCandidates.length === 0 && (
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    No local candidates available
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="remote" className="mt-0">
            <ScrollArea className="h-80 rounded-lg">
              <div className="p-1">
                {remoteCandidates.map(renderCandidateRow)}
                {remoteCandidates.length === 0 && (
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    No remote candidates available
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 p-3 rounded-lg bg-secondary/50 text-sm">
          <div className="font-medium mb-1">Selected Connection</div>
          {selectedIceCandidatePairStats ? (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <div className="text-xs text-muted-foreground">Local</div>
                <div>{selectedIceCandidatePairStats.localCandidate.address}:{selectedIceCandidatePairStats.localCandidate.port}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Remote</div>
                <div>{selectedIceCandidatePairStats.remoteCandidate.address}:{selectedIceCandidatePairStats.remoteCandidate.port}</div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">No selected connection found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ICECandidates;
