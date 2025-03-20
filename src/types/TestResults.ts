
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

export interface ConnectivityResults {
  groupRooms?: string;
  peerToPeerRooms?: string;
  recordings?: string;
  compositions?: string;
  networkTraversalService?: string;
  goRooms?: string;
  signalingRegion?: string;
  turn?: string;
  // New format properties
  signalConnection?: string;
  webrtcConnection?: string;
  publishAudio?: string;
  publishVideo?: string;
  reconnection?: string;
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

// New interface for quality results
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
  audioTestResults: AudioTestResults;
  bitrateTestResults?: BitrateTestResults; // Optional for new format
  browserInformation: BrowserInformation;
  connectivityResults: ConnectivityResults;
  preflightTestReport?: PreflightTestReport; // Optional for new format
  videoTestResults: VideoTestResults;
  qualityResults?: QualityResults; // New field for the new format
}
