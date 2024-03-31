import React, { useContext } from "react";
import { BiHomeAlt, BiBell } from "react-icons/bi";
import { MdOutlineChat, MdGames } from "react-icons/md"; // Import the MdGames icon
import { FiEdit } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import { useNavigate, useLocation } from "react-router-dom";
import useFetchNotifications from "../Hooks/useNotifications";

export default function BottomBar() {
  let navigate = useNavigate();
  let location = useLocation();

  let { currentUser } = useContext(FirestoreContext);
  let currentEmail = localStorage.getItem("userEmail");
  let { notifications } = useFetchNotifications();
  let isRead = notifications
    .filter((item) => item.isRead === false)
    .map((notif) => notif.isRead);

  return (
    <div className="bottom-bar">
      <BiHomeAlt
        size={40}
        className={`react-icon ${location.pathname.includes("/posts") ? "filled" : ""
          }`}
        onClick={() => navigate("/posts")}
      />
      <MdOutlineChat
        size={40}
        className={`react-icon ${location.pathname === "/chat-home" ? "filled" : ""
          }`}
        onClick={() => navigate("/chat-home/1")}
      />
      <FiEdit
        size={40}
        className={`react-icon ${location.pathname === "/create-post" ? "filled" : ""
          }`}
        onClick={() => navigate("/create-post")}
      />
      
      {/* New game icon */}
      <MdGames
        size={40}
        className={`react-icon ${location.pathname === "/Games" ? "filled" : ""
          }`}
        onClick={() => navigate("/Games")}
      />

      <div className="notification-icon">
        <BiBell
          size={40}
          className={`notification-icon react-icon ${location.pathname === "/notifications" ? "filled" : ""
            }`}
          onClick={() =>
            navigate("/notifications", {
              state: {
                isRead: isRead.length,
              },
            })
          }
        />
        {isRead.length ? (
          <div className="active-notifications">{isRead.length}</div>
        ) : (
          <></>
        )}
      </div>

      <AiOutlineUser
        size={40}
        className={`react-icon ${location.pathname === "/profile" ? "filled" : ""
          }`}
        onClick={() =>
          navigate("/profile", {
            state: {
              currentEmail: currentEmail,
              currentID: currentUser[0]?.id,
            },
          })
        }
      />
    </div>
  );
}