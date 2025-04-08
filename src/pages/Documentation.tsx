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
              and network quality metrics. This guide explains the structure and all attributes in the JSON file, including acceptable values where applicable.
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
                <li><strong>ua</strong>: Full user agent string from the browser <span className="text-gray-500">(String - varies by browser)</span></li>
                <li><strong>browser</strong>: Object containing browser name, version and major version
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>name</strong>: <span className="text-gray-500">(String - e.g., "Chrome", "Firefox", "Safari", "Edge")</span></li>
                    <li><strong>version</strong>: <span className="text-gray-500">(String - full version number, e.g., "89.0.4389.114")</span></li>
                    <li><strong>major</strong>: <span className="text-gray-500">(String - major version number, e.g., "89")</span></li>
                  </ul>
                </li>
                <li><strong>engine</strong>: Object containing browser engine name and version
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>name</strong>: <span className="text-gray-500">(String - e.g., "WebKit", "Gecko", "Blink")</span></li>
                    <li><strong>version</strong>: <span className="text-gray-500">(String - e.g., "537.36")</span></li>
                  </ul>
                </li>
                <li><strong>os</strong>: Object containing operating system name and version
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>name</strong>: <span className="text-gray-500">(String - e.g., "Windows", "Mac OS", "Linux", "iOS", "Android")</span></li>
                    <li><strong>version</strong>: <span className="text-gray-500">(String - e.g., "10", "10.15.7", "11")</span></li>
                  </ul>
                </li>
                <li><strong>device</strong>: Object containing device vendor and model (if available)
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>vendor</strong>: <span className="text-gray-500">(String - e.g., "Apple", "Samsung", "Google"; may be empty for desktops)</span></li>
                    <li><strong>model</strong>: <span className="text-gray-500">(String - e.g., "iPhone", "Pixel"; may be empty for desktops)</span></li>
                  </ul>
                </li>
                <li><strong>cpu</strong>: Object containing CPU architecture information <span className="text-gray-500">(Structure varies by device)</span></li>
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
                <li className="ml-6"><strong>deviceId</strong>: ID of the audio input device used in testing <span className="text-gray-500">(String - usually a UUID or "default")</span></li>
                <li className="ml-6"><strong>errors</strong>: Array of error messages encountered during testing <span className="text-gray-500">(String[] - empty if no errors)</span></li>
                <li className="ml-6"><strong>testName</strong>: Name identifier for the test performed <span className="text-gray-500">(String - e.g., "Audio Input Test")</span></li>
                <li className="ml-6"><strong>values</strong>: Array of numeric values collected during audio testing <span className="text-gray-500">(Number[] - values range from 0 to 1, representing volume levels)</span></li>
                <li className="ml-6"><strong>testTiming</strong>: Object with start time, end time, and test duration
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>start</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>end</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>duration</strong>: <span className="text-gray-500">(Number - milliseconds, typically 3000-10000)</span></li>
                  </ul>
                </li>
                <li><strong>outputTest</strong>: Object containing speaker test results <span className="text-gray-500">(Can be null if not tested; structure similar to inputTest when present)</span></li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "inputTest": {
    "deviceId": "default",        // ID of audio input device
    "errors": [],                 // Array of errors that occurred
    "testName": "Audio Input Test", // Name of the test
    "values": [0.15, 0.22, 0.18, 0.25], // Volume levels detected (0-1)
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
                <li><strong>deviceId</strong>: ID of the video device used in testing <span className="text-gray-500">(String - usually a UUID or "default")</span></li>
                <li><strong>errors</strong>: Array of error messages encountered during testing <span className="text-gray-500">(String[] - empty if no errors)</span></li>
                <li><strong>resolution</strong>: Object containing the captured video dimensions
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>width</strong>: <span className="text-gray-500">(Number - pixels, common values: 640, 1280, 1920)</span></li>
                    <li><strong>height</strong>: <span className="text-gray-500">(Number - pixels, common values: 480, 720, 1080)</span></li>
                  </ul>
                </li>
                <li><strong>testName</strong>: Name identifier for the test performed <span className="text-gray-500">(String - e.g., "Video Device Test")</span></li>
                <li><strong>testTiming</strong>: Object with start time, end time, and test duration
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>start</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>end</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>duration</strong>: <span className="text-gray-500">(Number - milliseconds, typically 3000-5000)</span></li>
                  </ul>
                </li>
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
              <p className="mb-4">The <code>connectivityResults</code> object contains various connectivity status checks. Each property can have one of these values:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                  <p className="font-semibold">Possible Values:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li><code>"operational"</code>: Service is working normally</li>
                    <li><code>"degraded"</code>: Service is working but with reduced performance</li>
                    <li><code>"outage"</code>: Service is not working</li>
                    <li><code>"Reachable"</code>: Service can be reached</li>
                    <li><code>"success"</code>: Test completed successfully</li>
                    <li><code>"failed"</code>: Test failed</li>
                  </ul>
                </div>
              </div>
              
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
  "turn": "operational"                 // TURN server status
  
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
                <li><strong>maxBitrate</strong>: Maximum bitrate achieved during testing <span className="text-gray-500">(Number - bits per second, typically 100000-10000000)</span></li>
                <li><strong>averageBitrate</strong>: Average bitrate during the test <span className="text-gray-500">(Number - bits per second)</span></li>
                <li><strong>errors</strong>: Array of error messages encountered during testing <span className="text-gray-500">(String[] - empty if no errors)</span></li>
                <li><strong>iceCandidateStats</strong>: Array of ICE candidate statistics objects
                  <ul className="list-disc pl-6 mt-1">
                    <li>Each object contains properties like <strong>id</strong>, <strong>timestamp</strong>, <strong>address</strong>, <strong>candidateType</strong> (values: "host", "srflx", "relay"), etc.</li>
                  </ul>
                </li>
                <li><strong>testName</strong>: Name identifier for the test performed <span className="text-gray-500">(String - e.g., "Bitrate Test")</span></li>
                <li><strong>testTiming</strong>: Object with start time, end time, and test duration
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>start</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>end</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>duration</strong>: <span className="text-gray-500">(Number - milliseconds, typically 5000-30000)</span></li>
                  </ul>
                </li>
                <li><strong>values</strong>: Array of bitrate measurements during the test <span className="text-gray-500">(Number[] - bits per second)</span></li>
                <li><strong>selectedIceCandidatePairStats</strong>: Object containing the selected ICE candidate pair used for the connection
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>localCandidate</strong>: Local ICE candidate statistics</li>
                    <li><strong>remoteCandidate</strong>: Remote ICE candidate statistics</li>
                  </ul>
                </li>
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
      "protocol": "udp",           // Protocol used (udp, tcp)
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
                <li className="ml-6"><strong>testTiming</strong>: Object with start time, end time, and test duration
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>start</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>end</strong>: <span className="text-gray-500">(Number - UNIX timestamp in milliseconds)</span></li>
                    <li><strong>duration</strong>: <span className="text-gray-500">(Number - milliseconds)</span></li>
                  </ul>
                </li>
                <li className="ml-6"><strong>networkTiming</strong>: Object with timing information for different network processes
                  <ul className="list-disc pl-6 mt-1">
                    <li>Each sub-object (<strong>dtls</strong>, <strong>ice</strong>, etc.) contains <strong>start</strong>, <strong>end</strong>, and <strong>duration</strong> fields</li>
                  </ul>
                </li>
                <li className="ml-6"><strong>stats</strong>: Object containing quality statistics
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>jitter</strong>: Object with <strong>min</strong>, <strong>max</strong>, and <strong>average</strong> values <span className="text-gray-500">(Numbers - milliseconds)</span></li>
                    <li><strong>rtt</strong>: Object with <strong>min</strong>, <strong>max</strong>, and <strong>average</strong> values <span className="text-gray-500">(Numbers - milliseconds)</span></li>
                    <li><strong>packetLoss</strong>: Object with <strong>min</strong>, <strong>max</strong>, and <strong>average</strong> values <span className="text-gray-500">(Numbers - percentage, 0-100)</span></li>
                  </ul>
                </li>
                <li className="ml-6"><strong>selectedIceCandidatePairStats</strong>: Object with information about the selected ICE candidate pair
                  <ul className="list-disc pl-6 mt-1">
                    <li>Contains <strong>localCandidate</strong> and <strong>remoteCandidate</strong> objects</li>
                  </ul>
                </li>
                <li className="ml-6"><strong>iceCandidateStats</strong>: Array of simplified ICE candidate statistics <span className="text-gray-500">(Array of objects)</span></li>
                <li className="ml-6"><strong>progressEvents</strong>: Array of events that occurred during the test
                  <ul className="list-disc pl-6 mt-1">
                    <li>Each event has a <strong>duration</strong> <span className="text-gray-500">(Number - milliseconds)</span> and <strong>name</strong> <span className="text-gray-500">(String - e.g., "dtls-connected", "ice-connected")</span></li>
                  </ul>
                </li>
                <li className="ml-6"><strong>mos</strong>: Mean Opinion Score statistics
                  <ul className="list-disc pl-6 mt-1">
                    <li>Contains <strong>min</strong>, <strong>max</strong>, and <strong>average</strong> values <span className="text-gray-500">(Numbers - range 1.0-5.0, where 5 is excellent quality)</span></li>
                  </ul>
                </li>
                <li><strong>error</strong>: Error information <span className="text-gray-500">(null if no errors; object with error details if present)</span></li>
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
        "min": 2,                  // Minimum jitter value (ms)
        "max": 15,                 // Maximum jitter value (ms)
        "average": 8               // Average jitter value (ms)
      },
      "rtt": { /* Round-trip time statistics */ },
      "packetLoss": { /* Packet loss statistics */ }
    },
    "selectedIceCandidatePairStats": {
      "localCandidate": {          // Local ICE candidate used
        "transportId": "RTCTransport_1",
        "candidateType": "host",   // Type: "host", "srflx", or "relay"
        "port": 56789,
        "address": "192.168.1.5",
        "priority": 123456,
        "protocol": "udp"          // Protocol: "udp" or "tcp"
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
      "min": 3.5,                  // Minimum MOS (1.0-5.0)
      "max": 4.2,                  // Maximum MOS (1.0-5.0)
      "average": 3.9               // Average MOS (1.0-5.0)
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
                <li className="ml-6"><strong>jitter</strong>: Audio jitter measurement <span className="text-gray-500">(Number - milliseconds, lower is better)</span></li>
                <li className="ml-6"><strong>packetLoss</strong>: Audio packet loss percentage <span className="text-gray-500">(Number - percentage, 0-100, lower is better)</span></li>
                <li className="ml-6"><strong>RTT</strong>: Round-trip time information
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>avg</strong>: <span className="text-gray-500">(String - e.g., "45ms", lower is better)</span></li>
                    <li><strong>max</strong>: <span className="text-gray-500">(String - e.g., "120ms")</span></li>
                  </ul>
                </li>
                <li className="ml-6"><strong>bitrate</strong>: Audio bitrate information
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>avg</strong>: <span className="text-gray-500">(String - e.g., "24kbps")</span></li>
                    <li><strong>max</strong>: <span className="text-gray-500">(String - e.g., "32kbps")</span></li>
                  </ul>
                </li>
                <li><strong>video</strong>: Object containing video quality metrics</li>
                <li className="ml-6"><strong>jitter</strong>: Video jitter measurement <span className="text-gray-500">(Number - milliseconds, lower is better)</span></li>
                <li className="ml-6"><strong>packetLoss</strong>: Video packet loss percentage <span className="text-gray-500">(Number - percentage, 0-100, lower is better)</span></li>
                <li className="ml-6"><strong>RTT</strong>: Round-trip time information
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>avg</strong>: <span className="text-gray-500">(String - e.g., "68ms", lower is better)</span></li>
                    <li><strong>max</strong>: <span className="text-gray-500">(String - e.g., "150ms")</span></li>
                  </ul>
                </li>
                <li className="ml-6"><strong>bitrate</strong>: Video bitrate information
                  <ul className="list-disc pl-6 mt-1">
                    <li><strong>avg</strong>: <span className="text-gray-500">(String - e.g., "1.2Mbps")</span></li>
                    <li><strong>max</strong>: <span className="text-gray-500">(String - e.g., "2.5Mbps")</span></li>
                  </ul>
                </li>
              </ul>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto mt-4">
                <pre className="text-sm">
{`{
  "audio": {
    "jitter": 12,                // Audio jitter in ms (lower is better)
    "packetLoss": 0.5,           // Audio packet loss percentage (lower is better)
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
    "jitter": 15,                // Video jitter in ms (lower is better)
    "packetLoss": 0.8,           // Video packet loss percentage (lower is better)
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
