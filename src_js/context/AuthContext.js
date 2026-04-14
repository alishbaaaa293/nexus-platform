
import { createContext, useState, useContext, useEffect } from "react";
import { users } from "../data/users";
import toast from "react-hot-toast";
const AuthContext = createContext(void 0);
const USER_STORAGE_KEY = "business_nexus_user";
const RESET_TOKEN_KEY = "business_nexus_reset_token";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password, role) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const foundUser = users.find((u) => u.email === email && u.role === role);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
        toast.success("Successfully logged in!");
      } else {
        throw new Error("Invalid credentials or user not found");
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (name, email, password, role) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      if (users.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }
      const newUser = {
        id: `${role[0]}${users.length + 1}`,
        name,
        email,
        role,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        bio: "",
        isOnline: true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      users.push(newUser);
      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const forgotPassword = async (email) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const user2 = users.find((u) => u.email === email);
      if (!user2) {
        throw new Error("No account found with this email");
      }
      const resetToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  const resetPassword = async (token, newPassword) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
      if (token !== storedToken) {
        throw new Error("Invalid or expired reset token");
      }
      localStorage.removeItem(RESET_TOKEN_KEY);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success("Logged out successfully");
  };
  const updateProfile = async (userId, updates) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export {
  AuthProvider,
  useAuth
};
