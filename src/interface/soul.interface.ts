export interface IUserProfile {
  name: string;
  email: string;
  userId: string;
  chatHistory: string[];
  moodTrends: string[];
  avatar: string;

  // Appwrite-specific metadata
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[];
  $databaseId?: string;
  $collectionId?: string;

  // Login response fields
  expire?: string;
  provider?: string;
  providerUid?: string;
  ip?: string;
  osName?: string;
  osVersion?: string;
  deviceName?: string;
  countryName?: string;
}
export interface ILoginResponse {
  data: {
    userId: string;
    expire: string;
    provider: string;
    ip: string;
    osName: string;
    osVersion: string;
    deviceName: string;
    countryName: string;

  };
}

export interface IAllChatHistory {
  id: string;
  message: string;
  reply: string;
  sentiment:ISentiment[];
  timestamp: string; // ISO string format
}

export interface ISentiment {
  id: string;
  label: string;
  score: number;
  timestamp: string;
  positive: number;
  negative: number;
  displayTimestamp?: string; // Added optional property for display purposes
}

export interface IChatResponse {
  reply: string;
  sentiment:ISentiment[]; 
}


export interface IUserAvatar {
  avatar: string;
}


export interface IChatRes {
  reply: string;
  sentiment: SentimentAnalysis[];
}

export interface SentimentAnalysis {
  label: string;
  score: number;
  id: string;
  sentiment: {
    label: string; // Add "NEUTRAL" for better classification
    score: number;
  }[];
  timestamp: string; // Keep timestamp for tracking
}


export interface IChatHistoryResponse {
  chatHistory: IAllChatHistory[];
  moodTrends: SentimentAnalysis[];
  
}


export interface IOnlyChatHistory {
  id: string;
  message: string;
  reply: string;
  timestamp: string; // ISO string format
}
