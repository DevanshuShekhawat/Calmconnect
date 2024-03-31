import React from "react";
import ThreadsPage from "../Pages/PostPage";
import BottomBar from "../Components/BottomBar";
import { logout } from "../API/Auth";

export default function PostLayout() {
  return (
    <div>
      <button className="logout-btn" onClick={() => logout()}>
        Log Out
      </button>
      <ThreadsPage />

      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
