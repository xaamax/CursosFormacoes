import api from "@/services/api";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Interface do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const login = (accessToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("ACCESS_TOKEN", accessToken);
  };
  
  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        await api.get("/auth/validate_token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    };

    validateToken();
  }, []);

  if (isAuthenticated === undefined) {
    return (
      <div style={{ 
        justifyItems: "center",
        height: "80vh"
      }}>
        Sem Autorização.<br />
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};