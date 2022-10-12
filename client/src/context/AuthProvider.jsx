import { createContext, useState } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  fullName: null,
  id: null,
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: false,
    fullName: "",
    id: "",
    token: "",
  });

  const login = (fullName, id, token) => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: true,
      fullName,
      id,
      token,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
