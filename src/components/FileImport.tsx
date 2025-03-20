import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, FileJson, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TestResults } from '@/types/TestResults';

interface FileImportProps {
  onImport: (data: TestResults) => void;
}

const FileImport: React.FC<FileImportProps> = ({ onImport }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const parseAndValidateFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        // Check if it matches either the old or new format
        if (isValidTestResults(data)) {
          onImport(data);
          toast.success('File imported successfully');
        } else {
          toast.error('Invalid file format. Please import a valid test results file.');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error('Failed to parse file. Please ensure it is a valid JSON file.');
      } finally {
        setIsLoading(false);
        setIsDragging(false);
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setIsLoading(false);
      setIsDragging(false);
    };

    reader.readAsText(file);
  };

  // Function to validate if the data is in the expected format
  const isValidTestResults = (data: any): data is TestResults => {
    // Check for required fields in both formats
    const hasCommonRequiredFields = 
      data.audioTestResults?.inputTest && 
      data.browserInformation && 
      data.videoTestResults;
      
    // Check for old format specific fields
    const isOldFormat = 
      hasCommonRequiredFields &&
      data.bitrateTestResults && 
      data.preflightTestReport &&
      ('groupRooms' in data.connectivityResults || 'signalingRegion' in data.connectivityResults);
      
    // Check for new format specific fields
    const isNewFormat = 
      hasCommonRequiredFields &&
      data.qualityResults &&
      ('signalConnection' in data.connectivityResults || 'webrtcConnection' in data.connectivityResults);
      
    return isOldFormat || isNewFormat;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        parseAndValidateFile(file);
      } else {
        toast.error('Please import a JSON file');
        setIsDragging(false);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      parseAndValidateFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDemoDataClick = () => {
    setIsLoading(true);
    fetch('/demoData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Demo data not available');
        }
        return response.json();
      })
      .then(data => {
        onImport(data);
        toast.success('Demo data loaded successfully');
      })
      .catch(error => {
        console.error('Error loading demo data:', error);
        // Use the example data from the original JSON instead
        const demoData = {
          "audioTestResults": {
            "inputTest": {
              "deviceId": "default",
              "errors": [],
              "testName": "audio-input-test",
              "values": [3.3125, 10.84375, 9.15625, 8.09375, 6.84375, 5.15625, 5.75, 8.625, 8.09375, 8.375, 7.46875, 5.65625, 7.46875, 6.78125, 4.625, 4.8125, 8.15625, 7.0625],
              "testTiming": {
                "duration": 1905,
                "end": 1740580752377,
                "start": 1740580750472
              }
            },
            "outputTest": null
          },
          "bitrateTestResults": {
            "maxBitrate": 40057.97797797798,
            "averageBitrate": 32330.649903900638,
            "errors": [],
            "iceCandidateStats": [],
            "testName": "media-connection-bitrate-test",
            "testTiming": {
              "start": 1740580754811,
              "end": 1740580769816,
              "duration": 15005
            },
            "values": [36933.56243756244, 39669.53539381854, 31921.685055165497, 39403.52, 40057.97797797798, 22562.78121878122, 26345.472, 27774.078078078077, 28745.728, 31004.956956956958, 31581.346653346653, 30326.784, 33971.02097902098],
            "selectedIceCandidatePairStats": {
              "localCandidate": {
                "id": "IpKyBHTrg",
                "timestamp": 1740580755227.421,
                "type": "local-candidate",
                "address": "122.172.81.235",
                "candidateType": "prflx",
                "foundation": "3359268961",
                "ip": "122.172.81.235",
                "isRemote": false,
                "networkType": "wifi",
                "port": 9145,
                "priority": 1853824767,
                "protocol": "udp",
                "relatedAddress": "192.168.1.2",
                "relatedPort": 62313,
                "transportId": "T01",
                "usernameFragment": "YoRV"
              },
              "remoteCandidate": {
                "id": "IEors1k7K",
                "timestamp": 1740580755227.421,
                "type": "remote-candidate",
                "address": "52.66.194.1",
                "candidateType": "relay",
                "foundation": "1378335964",
                "ip": "52.66.194.1",
                "isRemote": true,
                "port": 25929,
                "priority": 41886207,
                "protocol": "udp",
                "transportId": "T01",
                "usernameFragment": "oTx+"
              }
            }
          },
          "browserInformation": {
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
            "browser": {
              "name": "Edge",
              "version": "133.0.0.0",
              "major": "133"
            },
            "engine": {
              "name": "Blink",
              "version": "133.0.0.0"
            },
            "os": {
              "name": "Mac OS",
              "version": "10.15.7"
            },
            "device": {
              "vendor": "Apple",
              "model": "Macintosh"
            },
            "cpu": {}
          },
          "connectivityResults": {
            "groupRooms": "operational",
            "peerToPeerRooms": "operational",
            "recordings": "operational",
            "compositions": "operational",
            "networkTraversalService": "operational",
            "goRooms": "operational",
            "signalingRegion": "Reachable",
            "turn": "Reachable"
          },
          "preflightTestReport": {
            "report": {
              "testTiming": {
                "start": 1740580754528,
                "end": 1740580766475,
                "duration": 11947
              },
              "networkTiming": {
                "dtls": {
                  "start": 1740580756306,
                  "end": 1740580756394,
                  "duration": 88
                },
                "ice": {
                  "start": 1740580756160,
                  "end": 1740580756306,
                  "duration": 146
                },
                "peerConnection": {
                  "start": 1740580756160,
                  "end": 1740580756399,
                  "duration": 239
                },
                "connect": {
                  "start": 1740580754534,
                  "end": 1740580755844,
                  "duration": 1310
                },
                "media": {
                  "start": 1740580755850,
                  "end": 1740580756471,
                  "duration": 621
                }
              },
              "stats": {
                "jitter": {
                  "min": 0.004,
                  "max": 0.007,
                  "average": 0.006
                },
                "rtt": {
                  "min": 60,
                  "max": 87,
                  "average": 66.5
                },
                "packetLoss": {
                  "min": 0,
                  "max": 0,
                  "average": 0
                }
              },
              "selectedIceCandidatePairStats": {
                "localCandidate": {
                  "transportId": "T01",
                  "candidateType": "prflx",
                  "port": 20420,
                  "address": "122.172.81.235",
                  "priority": 1853824767,
                  "protocol": "udp"
                },
                "remoteCandidate": {
                  "transportId": "T01",
                  "candidateType": "relay",
                  "port": 24949,
                  "address": "52.66.194.17",
                  "priority": 41885951,
                  "protocol": "udp"
                }
              },
              "iceCandidateStats": [],
              "progressEvents": [
                {
                  "duration": 3,
                  "name": "mediaAcquired"
                },
                {
                  "duration": 1316,
                  "name": "connected"
                }
              ],
              "mos": {
                "min": 4.401762690075664,
                "max": 4.405729269690613,
                "average": 4.403639788272151
              }
            },
            "error": null
          },
          "videoTestResults": {
            "deviceId": "caca0b3986b55a20d7310dc4475772b578266cec71e4c6d813c3e086c06c029b",
            "errors": [],
            "resolution": {
              "width": 640,
              "height": 480
            },
            "testName": "video-input-test",
            "testTiming": {
              "duration": 12161,
              "end": 1740580750312,
              "start": 1740580738151
            }
          }
        };
        onImport(demoData);
        toast.success('Demo data loaded successfully');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className={cn(
          "w-full max-w-2xl h-64 rounded-2xl border-2 border-dashed transition-all duration-300 ease-apple",
          "flex flex-col items-center justify-center p-6 cursor-pointer",
          "bg-secondary/50 backdrop-blur-sm",
          isDragging ? "border-primary scale-[1.02] shadow-lg border-opacity-100" : "border-secondary border-opacity-70",
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="animate-slide-up">
          <div className={cn(
            "w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-secondary",
            isDragging ? "bg-primary/10" : ""
          )}>
            <Upload
              className={cn(
                "w-8 h-8 transition-all duration-300",
                isDragging ? "text-primary scale-110" : "text-muted-foreground"
              )}
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-center">
            {isDragging ? "Release to Import" : "Import Test Results"}
          </h3>
          
          <p className="text-muted-foreground text-center max-w-md">
            Drag and drop your JSON file here, or click to select a file
          </p>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept=".json,application/json" 
            onChange={handleFileInputChange}
          />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDemoDataClick}
          disabled={isLoading}
          className="flex items-center gap-2 transition-all duration-200 hover:shadow-md"
        >
          <FileJson className="h-4 w-4" />
          <span>Use Demo Data</span>
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowRight className="h-4 w-4" />
          <span>Visualize in seconds</span>
        </div>
      </div>
    </div>
  );
};

export default FileImport;
