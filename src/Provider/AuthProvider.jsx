import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setLoading(false);
        return result;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setLoading(false);
        return result;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const handleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", theme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", theme);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(true);
      if (loggedUser) {
        axios
          .post("https://sport-zone-academy-server.vercel.app/jwt", {
            email: loggedUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      updateProfile(user.displayName, user.photoURL);
    }
  }, [user]);

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    handleToggleTheme,
    theme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
