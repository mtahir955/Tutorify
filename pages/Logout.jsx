import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get("https://tutorify.live/api/logout.php", { withCredentials: true });
        
        navigate("/login"); 
      } catch (error) {
        console.error("Logout failed:", error);
        
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // or a loading indicator like <p>Logging out...</p>
}
