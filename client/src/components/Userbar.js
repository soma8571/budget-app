import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Userbar() {

  const [cookies, setCookies] = useCookies(["access_token", "username"]);
  const navigate = useNavigate();

  //Logout
  const logout = (e) => {
    e.preventDefault();
    setCookies("access_token", "");
    setCookies("username", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  return (
    <div className="userbar">
      {cookies.access_token &&
        <>
          <div className="loggedUser">Bejelentkezve, mint {cookies.username}</div>
          <div className="logoutBtnWrapper">
            
            <button className="logout" onClick={e => logout(e)}>
              <i className="fa-solid fa-arrow-right-from-bracket" style={{color: "#e59500", margin: "0 0.5rem"}}></i>
              Kijelentkezés
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default Userbar;
