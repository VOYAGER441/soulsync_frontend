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

export interface IChatHistory {
  [x: string]: string | string[];
  id: string;
  message: string;
  reply: string;
  timestamp: string; // ISO string format
}


export interface IChatResponse {
  reply: string,
  sentiment: string,
}

export interface IUserAvatar {
  avatar: string;
}