import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import UserDashboard from "./User/Dashboard";
import AdminDashboard from "./Admin/Dashboard";

const Dashboard = () => {
  const authUser = useAuthUser();
  
  const [isUser, setIsUser] = useState(true);
  useEffect(() => {
      if (authUser().user.role === "user") { 
        setIsUser(true);
      } else { 
        setIsUser(false); 
      }
  }, []);

  return <>{isUser ? <UserDashboard /> : <AdminDashboard />}</>;
};

export default Dashboard;
