
export interface AudioTestResults {
  inputTest: {
    deviceId: string;
    errors: string[];
    testName: string;
    values: number[];
    testTiming: TestTiming;
  };
  outputTest: null | any;
}

export interface BitrateTestResults {
  maxBitrate: number;
  averageBitrate: number;
  errors: string[];
  iceCandidateStats: ICECandidateStats[];
  testName: string;
  testTiming: TestTiming;
  values: number[];
  selectedIceCandidatePairStats: SelectedICECandidatePair;
}

export interface ICECandidateStats {
  id: string;
  timestamp: number;
  type: string;
  address: string;
  candidateType: string;
  foundation?: string;
  ip: string;
  isRemote: boolean;
  networkType?: string;
  port: number;
  priority: number;
  protocol: string;
  relatedAddress?: string;
  relatedPort?: number;
  relayProtocol?: string;
  transportId: string;
  url?: string;
  usernameFragment?: string;
  tcpType?: string;
}

export interface SelectedICECandidatePair {
  localCandidate: ICECandidateStats;
  remoteCandidate: ICECandidateStats;
}

export interface BrowserInformation {
  ua: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    vendor: string;
    model: string;
  };
  cpu: any;
}

// Common types for all connectivity status fields
export type ConnectivityStatus = 'operational' | 'degraded' | 'outage' | 'Reachable' | 'success' | 'failed';

export interface ConnectivityResults {
  // Legacy format properties
  groupRooms?: ConnectivityStatus;
  peerToPeerRooms?: ConnectivityStatus;
  recordings?: ConnectivityStatus;
  compositions?: ConnectivityStatus;
  networkTraversalService?: ConnectivityStatus;
  goRooms?: ConnectivityStatus;
  signalingRegion?: ConnectivityStatus;
  turn?: ConnectivityStatus;
  
  // New format properties
  signalConnection?: ConnectivityStatus;
  webrtcConnection?: ConnectivityStatus;
  publishAudio?: ConnectivityStatus;
  publishVideo?: ConnectivityStatus;
  reconnection?: ConnectivityStatus;
  
  // Allow for any other properties that might be present 
  [key: string]: ConnectivityStatus | undefined;
}

export interface PreflightTestReport {
  report: {
    testTiming: TestTiming;
    networkTiming: {
      dtls: TestTiming;
      ice: TestTiming;
      peerConnection: TestTiming;
      connect: TestTiming;
      media: TestTiming;
    };
    stats: {
      jitter: StatValue;
      rtt: StatValue;
      packetLoss: StatValue;
    };
    selectedIceCandidatePairStats: {
      localCandidate: SimplifiedICECandidate;
      remoteCandidate: SimplifiedICECandidate;
    };
    iceCandidateStats: SimplifiedICECandidate[];
    progressEvents: {
      duration: number;
      name: string;
    }[];
    mos: StatValue;
  };
  error: null | any;
}

export interface SimplifiedICECandidate {
  transportId: string;
  candidateType: string;
  port: number;
  address: string;
  priority: number;
  protocol: string;
  url?: string;
  relayProtocol?: string;
}

export interface StatValue {
  min: number;
  max: number;
  average: number;
}

export interface TestTiming {
  start: number;
  end: number;
  duration: number;
}

export interface VideoTestResults {
  deviceId: string;
  errors: string[];
  resolution: {
    width: number;
    height: number;
  };
  testName: string;
  testTiming: TestTiming;
}

// Interface for quality results
export interface QualityResults {
  audio: {
    jitter: number;
    packetLoss: number;
    RTT: {
      avg: string;
      max: string;
    };
    bitrate: {
      avg: string;
      max: string;
    };
  };
  video: {
    jitter: number;
    packetLoss: number;
    RTT: {
      avg: string;
      max: string;
    };
    bitrate: {
      avg: string;
      max: string;
    };
  };
}

export interface TestResults {
  // Required fields for all formats
  audioTestResults: AudioTestResults;
  browserInformation: BrowserInformation;
  videoTestResults: VideoTestResults;
  connectivityResults: ConnectivityResults;
  
  // Optional fields that may be present in different formats
  bitrateTestResults?: BitrateTestResults;
  preflightTestReport?: PreflightTestReport;
  qualityResults?: QualityResults;
}
