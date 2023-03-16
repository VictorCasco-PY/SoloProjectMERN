import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FirstContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  const [admin, setAdmin] = useState(null);

  const validateAdmin = () => {
    axios
      .get("http://localhost:8000/api/admin", { withCredentials: true })
      .then(() => {
        console.log("OK");
        setAdmin(true);
      })
      .catch((error) => {
        console.log(error);
        setAdmin(false);
      });
  };

  useEffect(() => {
    console.log("USER", users);
  }, [users]);

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <FirstContext.Provider
      value={{
        users,
        admin,
        setUsers,
        validateAdmin,
      }}
    >
      {children}
    </FirstContext.Provider>
  );
};

export default ContextProvider;
