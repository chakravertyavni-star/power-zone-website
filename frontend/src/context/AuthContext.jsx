import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setEmail("");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    api
      .me()
      .then((data) => {
        if (!cancelled) setEmail(data.email);
      })
      .catch(() => {
        localStorage.removeItem("token");
        if (!cancelled) {
          setToken(null);
          setEmail("");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      email,
      loading,
      isAdmin: email === "samya@gmail.com",
      login: (nextToken) => {
        localStorage.setItem("token", nextToken);
        setToken(nextToken);
      },
      logout: () => {
        localStorage.removeItem("token");
        setToken(null);
        setEmail("");
      },
    }),
    [token, email, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
