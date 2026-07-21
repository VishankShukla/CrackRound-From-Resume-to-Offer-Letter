import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";

// Pulls a readable message out of whatever shape the error has.
function extractErrorMessage(err, fallback) {
  return err?.response?.data?.message || fallback;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: extractErrorMessage(err, "Could not log in. Please try again."),
      };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: extractErrorMessage(err, "Could not create account. Please try again."),
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: extractErrorMessage(err, "Could not log out. Please try again."),
      };
    } finally {
      setLoading(false);
    }
  };

  // Runs once per mounted component that calls useAuth(), just to check
  // if a valid session cookie already exists (e.g. on page refresh).
  useEffect(() => {
    let cancelled = false;

    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        if (!cancelled) setUser(data.user);
      } catch (err) {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getAndSetUser();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, handleRegister, handleLogout, handleLogin };
};
