import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";


function IsAuthenticated() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setUserData}=useContext(userDataContext);
    const navigate=useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/verify`, {
              withCredentials: true,
            });
            if(res.data.success){
              setUserData(res.data.data);
              setIsAuthenticated(true);
            }
            else{
              setIsAuthenticated(false);
              navigate("/signin");
            }
          } catch (err) {
            setIsAuthenticated(false);
           navigate("/signin");
          }
        };
    
        checkAuth();
      }, [navigate]);

  return (
    isAuthenticated? <Outlet></Outlet>:null
  )
}

export default IsAuthenticated