import {createContext, useContext, useState} from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../utils/api.js";


const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const maybeUser = localStorage.getItem("user");

        if (maybeUser) {
            return JSON.parse(maybeUser);
        }
    });

    const login = async (username, password) => {
  try {
    setAuth(username, password);
    const response = await api.get("/auth/me");
    const userData = response.data;
    const user = {
      username,
      password,
      roles: userData.roles,
    };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/");
  } catch (err) {
    clearAuth();
    localStorage.removeItem("user");
    throw new Error("Invalid username or password");
  }
};

    const registerUser = async (username, password) => {
  try {
    await api.post("/auth/register", { username, password });
    navigate("/login");
  } catch (err) {
    if (err.response && err.response.status === 409) {
      throw new Error("Username already exists.");
    }
    throw new Error("Registration failed. Please try again.");
  }
};

    const logout = () => {
        setUser(null);
        // Ištrinam username ir password iš axios
        clearAuth();
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        // Paduodas sukurtas funkcijas, tam kad jas būtų galima naudoti betkur su useAuth
        <AuthContext.Provider value={{ user, login, logout, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Sukuriamas custom hookas, kuris leidžia naudoti AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
