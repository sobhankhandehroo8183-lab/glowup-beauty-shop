import { createContext, useContext, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [profileCompletedOnce, setProfileCompletedOnce] = useState(
    () => sessionStorage.getItem('profileCompletedOnce') === 'true'
  );

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const isProfileComplete =
    profile.firstName?.trim() !== '' &&
    profile.lastName?.trim() !== '' &&
    profile.email?.trim() !== '';

  // 🔹 هماهنگ‌سازی قطعی
  useEffect(() => {
    if (isProfileComplete) {
      sessionStorage.setItem('profileCompletedOnce', 'true');
      setProfileCompletedOnce(true);
    }
  }, [isProfileComplete]);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);

    emailjs.send(
      'service_xxxxx',
      'template_xxxxx',
      {
        from_name: `${newProfile.firstName} ${newProfile.lastName}`,
        from_email: newProfile.email,
        message: `اطلاعات پروفایل: ${JSON.stringify(newProfile)}`,
        to_email: 'sobhankhandehroo8183@gmail.com'
      },
      'user_xxxxx'
    );
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isProfileComplete,
        updateProfile,
        profileCompletedOnce,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
