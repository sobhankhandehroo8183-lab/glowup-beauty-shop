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

  // 🔹 اضافه شده: وضعیت Auth کاربر
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // 🔹 اضافه شده: ذخیره‌سازی کاربران و رمزها
  const [usersDatabase, setUsersDatabase] = useState(() => {
    const savedUsers = localStorage.getItem('usersDatabase');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  // 🔹 اضافه شده: ذخیره وضعیت Auth
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  // 🔹 اضافه شده: ذخیره دیتابیس کاربران
  useEffect(() => {
    localStorage.setItem('usersDatabase', JSON.stringify(usersDatabase));
  }, [usersDatabase]);

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

  // 🔹 اضافه شده: توابع Auth جدید با اعتبارسنجی رمز
  const login = (username, password) => {
    // چک کردن در دیتابیس کاربران
    const foundUser = usersDatabase.find(user => 
      user.username === username && user.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        profileCompleted: isProfileComplete
      });
      setIsAuthenticated(true);
      
      // اگر کاربر لاگین کرد و پروفایلش کامل است، ذخیره کن
      if (isProfileComplete) {
        setProfileCompletedOnce(true);
        sessionStorage.setItem('profileCompletedOnce', 'true');
      }
      
      return { success: true, message: 'ورود موفقیت‌آمیز' };
    } else {
      return { success: false, message: 'نام کاربری یا رمز عبور اشتباه است' };
    }
  };

  const register = (username, password, email, userProfile) => {
    // چک کردن وجود کاربر
    const userExists = usersDatabase.some(user => user.username === username);
    if (userExists) {
      return { success: false, message: 'این نام کاربری قبلاً ثبت شده است' };
    }

    const newUser = {
      id: Date.now(),
      username,
      password, // 🔹 رمز ذخیره می‌شود
      email,
      profile: userProfile || {}
    };
    
    // اضافه کردن کاربر جدید به دیتابیس
    setUsersDatabase(prev => [...prev, newUser]);
    
    // لاگین کردن کاربر
    setUser({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      profileCompleted: false
    });
    setIsAuthenticated(true);
    
    // ذخیره اطلاعات پروفایل اگر ارسال شده
    if (userProfile) {
      setProfile(userProfile);
    }
    
    return { success: true, message: 'ثبت‌نام موفقیت‌آمیز بود' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // پروفایل رو پاک نکن، فقط وضعیت Auth رو غیرفعال کن
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isProfileComplete,
        updateProfile,
        profileCompletedOnce,
        // 🔹 اضافه شده: مقادیر Auth جدید
        user,
        isAuthenticated,
        usersDatabase,
        login,
        register,
        logout
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);