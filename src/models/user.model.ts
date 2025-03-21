export interface User {
  _id: string;
  name: string;
  username: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  username: string;
}
export interface AudiosInfo {
  _id: string;
  s3_key?: string;
  audio_filename?: string;
  userID?: string;
}
export interface AudioListProps {
  _id: string;
}

export interface AudioData {
  time: number[];
  original_signal: number[];
  filtered_signal: number[];
  envelope_signal: number[];
  rpm: number;
}
