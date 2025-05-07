import { formatDistance } from "date-fns";
import { LANGUAGE_TO_FLAG } from "../constants";

export const formatUserData = (data: any) => {
  return {
    id: data?._id,
    fullName: data?.fullName,
    email: data?.email,
    bio: data?.bio,
    profilePic: data?.profilePic,
    nativeLanguage: data?.nativeLanguage,
    learningLanguage: data?.learningLanguage,
    location: data?.location,
    isOnboarded: data?.isOnboarded,
    friends: data?.friends,
  };
};
export const getLanguageFlag = (language: string) => {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower as keyof typeof LANGUAGE_TO_FLAG];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block" />
    )
  }
  return null
}

export const capitialize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const dateFromNow = (date: Date) => {
  return formatDistance(date, new Date(), { addSuffix: true })
}