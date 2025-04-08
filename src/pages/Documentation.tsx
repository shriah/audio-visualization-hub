
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileJson, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Test Results Documentation</h1>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              <CardTitle>About the Test Results Format</CardTitle>
            </div>
            <CardDescription>
              This documentation explains the structure of the test results JSON format used in this application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The test results contain information about audio and video device tests, browser details, connectivity tests, 
              and network quality metrics. This guide explains the structure and all attributes in the JSON file.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overview Section */}
      <div className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">JSON Structure Overview</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The test results JSON file contains the following main sections:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>audioTestResults</strong>: Information about audio input/output device tests</li>
                <li><strong>videoTestResults</strong>: Information about video device tests and resolution</li>
                <li><strong>browserInformation</strong>: Details about the user's browser and device</li>
                <li><strong>connectivityResults</strong>: Status of various connectivity checks</li>
                <li><strong>bitrateTestResults</strong>: (Optional) Bandwidth test information</li>
                <li><strong>preflightTestReport</strong>: (Optional) Detailed network and connection tests</li>
                <li><strong>qualityResults</strong>: (Optional) Audio and video quality metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Browser Information Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Browser Information</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>browserInformation</code> object contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>ua</strong>: Full user agent string from the browser</li>
                <li><strong>browser</strong>: Object containing browser name, version and major version</li>
                <li><strong>engine</strong>: Object containing browser engine name and version</li>
                <li><strong>os</strong>: Object containing operating system name and version</li>
                <li><strong>device</strong>: Object containing device vendor and model (if available)</li>
                <li><strong>cpu</strong>: Object containing CPU architecture information</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
  "browser": {
    "name": "Chrome",     // Browser name (Chrome, Firefox, Safari, etc.)
    "version": "89.0.4389.114",   // Full version string
    "major": "89"         // Major version number
  },
  "engine": {
    "name": "WebKit",     // Browser engine name (Webkit, Gecko, etc.)
    "version": "537.36"   // Engine version
  },
  "os": {
    "name": "Mac OS",     // Operating system name
    "version": "10.15.7"  // OS version
  },
  "device": {
    "vendor": "",         // Device manufacturer (if available)
    "model": ""           // Device model (if available)
  },
  "cpu": {}               // CPU architecture information
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Audio Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Audio Test Results</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>audioTestResults</code> object contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>inputTest</strong>: Object containing microphone test results</li>
                <li className="ml-6"><strong>deviceId</strong>: ID of the audio input device used in testing</li>
                <li className="ml-6"><strong>errors</strong>: Array of error messages encountered during testing</li>
                <li className="ml-6"><strong>testName</strong>: Name identifier for the test performed</li>
                <li className="ml-6"><strong>values</strong>: Array of numeric values collected during audio testing (e.g., volume levels)</li>
                <li className="ml-6"><strong>testTiming</strong>: Object with start time, end time, and test duration</li>
                <li><strong>outputTest</strong>: Object containing speaker test results (can be null if not tested)</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "inputTest": {
    "deviceId": "default",        // ID of audio input device
    "errors": [],                 // Array of errors that occurred
    "testName": "Audio Input Test", // Name of the test
    "values": [0.15, 0.22, 0.18, 0.25], // Volume levels detected
    "testTiming": {
      "start": 1617293568420,     // Test start timestamp (ms)
      "end": 1617293573420,       // Test end timestamp (ms)
      "duration": 5000            // Test duration (ms)
    }
  },
  "outputTest": null              // Speaker test results (if available)
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        {/* Video Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Video Test Results</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>videoTestResults</code> object contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>deviceId</strong>: ID of the video device used in testing</li>
                <li><strong>errors</strong>: Array of error messages encountered during testing</li>
                <li><strong>resolution</strong>: Object containing the captured video dimensions</li>
                <li className="ml-6"><strong>width</strong>: Width of the video in pixels</li>
                <li className="ml-6"><strong>height</strong>: Height of the video in pixels</li>
                <li><strong>testName</strong>: Name identifier for the test performed</li>
                <li><strong>testTiming</strong>: Object with start time, end time, and test duration</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "deviceId": "user-camera-id",  // ID of the video device
  "errors": [],                  // Array of errors that occurred
  "resolution": {
    "width": 1280,               // Video width in pixels
    "height": 720                // Video height in pixels
  },
  "testName": "Video Device Test", // Name of the test
  "testTiming": {
    "start": 1617293573425,      // Test start timestamp (ms)
    "end": 1617293576425,        // Test end timestamp (ms)
    "duration": 3000             // Test duration (ms)
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator />

        {/* Connectivity Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Connectivity Results</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>connectivityResults</code> object contains various connectivity status checks. Each property can have one of these values: <code>"operational"</code>, <code>"degraded"</code>, <code>"outage"</code>, <code>"Reachable"</code>, <code>"success"</code>, or <code>"failed"</code>.</p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Twilio:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>groupRooms</strong>: Status of group video rooms functionality</li>
                  <li><strong>peerToPeerRooms</strong>: Status of peer-to-peer connection functionality</li>
                  <li><strong>recordings</strong>: Status of recording service</li>
                  <li><strong>compositions</strong>: Status of composition service</li>
                  <li><strong>networkTraversalService</strong>: Status of network traversal services</li>
                  <li><strong>goRooms</strong>: Status of Go-based room services</li>
                  <li><strong>signalingRegion</strong>: Status of signaling region services</li>
                  <li><strong>turn</strong>: Status of TURN servers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">LiveKit:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>signalConnection</strong>: Status of signaling connection</li>
                  <li><strong>webrtcConnection</strong>: Status of WebRTC connection</li>
                  <li><strong>publishAudio</strong>: Status of audio publishing capability</li>
                  <li><strong>publishVideo</strong>: Status of video publishing capability</li>
                  <li><strong>reconnection</strong>: Status of reconnection capability</li>
                </ul>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  /* Twilio properties */
  "groupRooms": "operational",           // Group video room status
  "peerToPeerRooms": "operational",      // P2P room status
  "recordings": "operational",           // Recording functionality status
  "compositions": "operational",         // Composition functionality status
  "networkTraversalService": "operational", // Network traversal status
  "goRooms": "operational",              // Go-based room service status
  "signalingRegion": "operational",      // Signaling region status
  "turn": "operational",                 // TURN server status
  
  /* LiveKit properties */
  "signalConnection": "operational",     // Signaling connection status
  "webrtcConnection": "operational",     // WebRTC connection status
  "publishAudio": "operational",         // Audio publishing status
  "publishVideo": "operational",         // Video publishing status
  "reconnection": "operational"          // Reconnection capability status
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        {/* Bitrate Test Results Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Bitrate Test Results (Optional)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>bitrateTestResults</code> object, if present, contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>maxBitrate</strong>: Maximum bitrate achieved during testing (in bps)</li>
                <li><strong>averageBitrate</strong>: Average bitrate during the test (in bps)</li>
                <li><strong>errors</strong>: Array of error messages encountered during testing</li>
                <li><strong>iceCandidateStats</strong>: Array of ICE candidate statistics objects</li>
                <li><strong>testName</strong>: Name identifier for the test performed</li>
                <li><strong>testTiming</strong>: Object with start time, end time, and test duration</li>
                <li><strong>values</strong>: Array of bitrate measurements during the test</li>
                <li><strong>selectedIceCandidatePairStats</strong>: Object containing the selected ICE candidate pair used for the connection</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "maxBitrate": 2500000,           // Maximum bitrate in bps
  "averageBitrate": 1800000,       // Average bitrate in bps
  "errors": [],                    // Array of errors
  "iceCandidateStats": [           // Array of ICE candidate statistics
    {
      "id": "RTCIceCandidate_uaS9Z", // Candidate ID
      "timestamp": 1617293580000,  // Timestamp
      "type": "local-candidate",   // Candidate type
      "address": "192.168.1.5",    // IP address
      "candidateType": "host",     // Candidate type (host, srflx, relay)
      "ip": "192.168.1.5",         // IP address
      "isRemote": false,           // Whether this is a remote candidate
      "port": 56789,               // Port number
      "priority": 123456,          // Candidate priority
      "protocol": "udp",           // Protocol used
      "transportId": "RTCTransport_0", // Transport ID
      // ... other ICE candidate properties
    }
    // ... more candidates
  ],
  "testName": "Bitrate Test",      // Test name
  "testTiming": {
    "start": 1617293580000,        // Test start timestamp
    "end": 1617293590000,          // Test end timestamp
    "duration": 10000              // Test duration in ms
  },
  "values": [1500000, 1800000, 2100000, 2500000], // Bitrate samples
  "selectedIceCandidatePairStats": {
    "localCandidate": { /* ICE candidate object */ },
    "remoteCandidate": { /* ICE candidate object */ }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        {/* Preflight Test Report Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Preflight Test Report (Optional)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>preflightTestReport</code> object, if present, contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>report</strong>: Object containing the detailed test report</li>
                <li className="ml-6"><strong>testTiming</strong>: Object with start time, end time, and test duration</li>
                <li className="ml-6"><strong>networkTiming</strong>: Object with timing information for different network processes</li>
                <li className="ml-6"><strong>stats</strong>: Object containing jitter, RTT, and packet loss statistics</li>
                <li className="ml-6"><strong>selectedIceCandidatePairStats</strong>: Object with information about the selected ICE candidate pair</li>
                <li className="ml-6"><strong>iceCandidateStats</strong>: Array of simplified ICE candidate statistics</li>
                <li className="ml-6"><strong>progressEvents</strong>: Array of events that occurred during the test</li>
                <li className="ml-6"><strong>mos</strong>: Mean Opinion Score statistics</li>
                <li><strong>error</strong>: Error information, null if no errors occurred</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "report": {
    "testTiming": {
      "start": 1617293600000,      // Test start timestamp
      "end": 1617293620000,        // Test end timestamp
      "duration": 20000            // Test duration in ms
    },
    "networkTiming": {
      "dtls": {                    // DTLS connection timing
        "start": 1617293601000,
        "end": 1617293602000,
        "duration": 1000
      },
      "ice": { /* ICE connection timing */ },
      "peerConnection": { /* Peer connection timing */ },
      "connect": { /* Overall connection timing */ },
      "media": { /* Media establishment timing */ }
    },
    "stats": {
      "jitter": {                  // Jitter statistics
        "min": 2,                  // Minimum jitter value
        "max": 15,                 // Maximum jitter value
        "average": 8               // Average jitter value
      },
      "rtt": { /* Round-trip time statistics */ },
      "packetLoss": { /* Packet loss statistics */ }
    },
    "selectedIceCandidatePairStats": {
      "localCandidate": {          // Local ICE candidate used
        "transportId": "RTCTransport_1",
        "candidateType": "host",
        "port": 56789,
        "address": "192.168.1.5",
        "priority": 123456,
        "protocol": "udp"
        // ... other properties
      },
      "remoteCandidate": { /* Remote ICE candidate used */ }
    },
    "iceCandidateStats": [
      // Array of simplified ICE candidate objects
    ],
    "progressEvents": [
      {
        "duration": 500,           // Event duration in ms
        "name": "dtls-connected"   // Event name
      }
      // ... more events
    ],
    "mos": {                       // Mean Opinion Score
      "min": 3.5,                  // Minimum MOS
      "max": 4.2,                  // Maximum MOS
      "average": 3.9               // Average MOS
    }
  },
  "error": null                    // Error information, null if none
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        {/* Quality Results Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quality Results (Optional)</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The <code>qualityResults</code> object, if present, contains:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>audio</strong>: Object containing audio quality metrics</li>
                <li className="ml-6"><strong>jitter</strong>: Audio jitter measurement in milliseconds</li>
                <li className="ml-6"><strong>packetLoss</strong>: Audio packet loss percentage</li>
                <li className="ml-6"><strong>RTT</strong>: Round-trip time information (avg and max)</li>
                <li className="ml-6"><strong>bitrate</strong>: Audio bitrate information (avg and max)</li>
                <li><strong>video</strong>: Object containing video quality metrics</li>
                <li className="ml-6"><strong>jitter</strong>: Video jitter measurement in milliseconds</li>
                <li className="ml-6"><strong>packetLoss</strong>: Video packet loss percentage</li>
                <li className="ml-6"><strong>RTT</strong>: Round-trip time information (avg and max)</li>
                <li className="ml-6"><strong>bitrate</strong>: Video bitrate information (avg and max)</li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "audio": {
    "jitter": 12,                // Audio jitter in ms
    "packetLoss": 0.5,           // Audio packet loss percentage
    "RTT": {
      "avg": "45ms",             // Average round-trip time
      "max": "120ms"             // Maximum round-trip time
    },
    "bitrate": {
      "avg": "24kbps",           // Average audio bitrate
      "max": "32kbps"            // Maximum audio bitrate
    }
  },
  "video": {
    "jitter": 15,                // Video jitter in ms
    "packetLoss": 0.8,           // Video packet loss percentage
    "RTT": {
      "avg": "68ms",             // Average round-trip time
      "max": "150ms"             // Maximum round-trip time
    },
    "bitrate": {
      "avg": "1.2Mbps",          // Average video bitrate
      "max": "2.5Mbps"           // Maximum video bitrate
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />
        
        {/* Full Example Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Complete Example JSON</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">Here's a complete example JSON with most common fields:</p>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">
{`{
  "audioTestResults": {
    "inputTest": {
      "deviceId": "default",
      "errors": [],
      "testName": "Audio Input Test",
      "values": [0.15, 0.22, 0.18, 0.25],
      "testTiming": {
        "start": 1617293568420,
        "end": 1617293573420,
        "duration": 5000
      }
    },
    "outputTest": null
  },
  "videoTestResults": {
    "deviceId": "user-camera-id",
    "errors": [],
    "resolution": {
      "width": 1280,
      "height": 720
    },
    "testName": "Video Device Test",
    "testTiming": {
      "start": 1617293573425,
      "end": 1617293576425,
      "duration": 3000
    }
  },
  "browserInformation": {
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    "browser": {
      "name": "Chrome",
      "version": "89.0.4389.114",
      "major": "89"
    },
    "engine": {
      "name": "WebKit",
      "version": "537.36"
    },
    "os": {
      "name": "Mac OS",
      "version": "10.15.7"
    },
    "device": {
      "vendor": "",
      "model": ""
    },
    "cpu": {}
  },
  "connectivityResults": {
    "signalConnection": "operational",
    "webrtcConnection": "operational",
    "publishAudio": "operational",
    "publishVideo": "operational",
    "groupRooms": "operational"
  },
  "qualityResults": {
    "audio": {
      "jitter": 12,
      "packetLoss": 0.5,
      "RTT": {
        "avg": "45ms",
        "max": "120ms"
      },
      "bitrate": {
        "avg": "24kbps",
        "max": "32kbps"
      }
    },
    "video": {
      "jitter": 15,
      "packetLoss": 0.8,
      "RTT": {
        "avg": "68ms",
        "max": "150ms"
      },
      "bitrate": {
        "avg": "1.2Mbps",
        "max": "2.5Mbps"
      }
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
