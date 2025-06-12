import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index.js";
import {
  AddDocumentType,
  AddRoleName,
  AddUser,
  InsertAdmin,
  InsertCompany,
} from "../index.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user == null) {
        setUser(null);
      } else {
        setUser(session?.user);
        dataInsert(session?.user.id, session?.user.email);
      }
    });

    return () => {
      data.subscription;
    };
  }, []);

  const dataInsert = async (id_auth, email) => {
    const response = await AddUser({ id_auth: id_auth });

    if (response) {
      return;
    } else {
      const companyResponse = await InsertCompany({ id_auth: id_auth });

      const typeDocResponse = await AddDocumentType({
        id_company: companyResponse?.id,
      });

      const roleResponse = await AddRoleName({ name: "supaAdmin" });

      const userParams = {
        id_document_type: typeDocResponse[0]?.id,
        id_role: roleResponse?.id,
        email: email,
        createdAt: new Date(),
        id_auth: id_auth,
      };

      await InsertAdmin(userParams);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
