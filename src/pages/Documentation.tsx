
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileJson, Info } from "lucide-react";

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
              and network quality metrics. Use this guide to understand how to interpret the data in the JSON file.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="browser">Browser Info</TabsTrigger>
          <TabsTrigger value="audio">Audio Tests</TabsTrigger>
          <TabsTrigger value="video">Video Tests</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="example">Example JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileJson className="h-5 w-5 text-emerald-500" />
                <CardTitle>JSON Structure Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The test results JSON file contains multiple sections:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>audioTestResults</strong>: Information about audio input/output device tests</li>
                  <li><strong>videoTestResults</strong>: Information about video device tests and resolution</li>
                  <li><strong>browserInformation</strong>: Details about the user's browser and device</li>
                  <li><strong>connectivityResults</strong>: Status of various connectivity checks</li>
                  <li><strong>bitrateTestResults</strong>: (Optional) Bandwidth test information</li>
                  <li><strong>preflightTestReport</strong>: (Optional) Detailed network and connection tests</li>
                  <li><strong>qualityResults</strong>: (Optional) Audio and video quality metrics</li>
                </ul>
                <div className="text-sm text-muted-foreground mt-4">
                  <p>The exact fields available may vary depending on which tests were conducted.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browser" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browser Information Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The <code>browserInformation</code> object contains:</p>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`{
  "ua": "User agent string",
  "browser": {
    "name": "Browser name (Chrome, Firefox, etc.)",
    "version": "Browser version",
    "major": "Major version number"
  },
  "engine": {
    "name": "Engine name (Webkit, Gecko, etc.)",
    "version": "Engine version"
  },
  "os": {
    "name": "Operating system name",
    "version": "OS version"
  },
  "device": {
    "vendor": "Device manufacturer (if available)",
    "model": "Device model (if available)"
  },
  "cpu": {}
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Test Results Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The <code>audioTestResults</code> object contains:</p>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`{
  "inputTest": {
    "deviceId": "ID of the audio input device",
    "errors": ["Array of errors that occurred during testing"],
    "testName": "Name of the test conducted",
    "values": [/* Array of numeric values collected during the test */],
    "testTiming": {
      "start": /* Start timestamp */,
      "end": /* End timestamp */,
      "duration": /* Test duration in milliseconds */
    }
  },
  "outputTest": null /* or similar object structure as inputTest */
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Test Results Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The <code>videoTestResults</code> object contains:</p>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`{
  "deviceId": "ID of the video device",
  "errors": ["Array of errors that occurred during testing"],
  "resolution": {
    "width": /* Video width in pixels */,
    "height": /* Video height in pixels */
  },
  "testName": "Name of the test conducted",
  "testTiming": {
    "start": /* Start timestamp */,
    "end": /* End timestamp */,
    "duration": /* Test duration in milliseconds */
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connectivity Results Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The <code>connectivityResults</code> object contains various connectivity status checks.</p>
                <p>Each property can have one of these values: <code>"operational"</code>, <code>"degraded"</code>, <code>"outage"</code>, <code>"Reachable"</code>, <code>"success"</code>, or <code>"failed"</code></p>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`{
  /* Legacy format properties */
  "groupRooms": "operational",
  "peerToPeerRooms": "operational",
  "recordings": "operational",
  "compositions": "operational",
  "networkTraversalService": "operational",
  "goRooms": "operational",
  "signalingRegion": "operational",
  "turn": "operational",
  
  /* New format properties */
  "signalConnection": "operational",
  "webrtcConnection": "operational",
  "publishAudio": "operational",
  "publishVideo": "operational",
  "reconnection": "operational"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The <code>qualityResults</code> object (if present) contains:</p>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`{
  "audio": {
    "jitter": /* Jitter value */,
    "packetLoss": /* Packet loss percentage */,
    "RTT": {
      "avg": "Average round-trip time",
      "max": "Maximum round-trip time"
    },
    "bitrate": {
      "avg": "Average bitrate",
      "max": "Maximum bitrate"
    }
  },
  "video": {
    "jitter": /* Jitter value */,
    "packetLoss": /* Packet loss percentage */,
    "RTT": {
      "avg": "Average round-trip time",
      "max": "Maximum round-trip time"
    },
    "bitrate": {
      "avg": "Average bitrate",
      "max": "Maximum bitrate"
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="example" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Example JSON</CardTitle>
            </CardHeader>
            <CardContent>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
