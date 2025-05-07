interface AxiosResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
interface signupType {
  fullName: string;
  email: string;
  password: string;
  agree: boolean;
}
interface loginType {
  email: string;
  password: string;
}
interface onboardType {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePic: string;
}
interface themeType {
  theme: string;
  setTheme: (theme: string) => void;
}
interface userType {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  isOnboarded: boolean;
}
interface friendRequestType {
  _id: string;
  sender: userType;
  recipient: userType;
  status: string;
  createdAt: Date;
}
interface sendRequestType {
  userId: string;
}
interface friendRequestType {
  inCommingReqs: friendRequestType[];
  acceptedReqs: friendRequestType[];
}
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
