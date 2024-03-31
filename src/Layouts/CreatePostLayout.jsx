import React from "react";
import CreateThread from "../Pages/CreateThread";
import BottomBar from "../Components/BottomBar";

export default function CreatePostLayout() {
  return (
    <div>
      <CreateThread />
      <BottomBar />
    </div>
  );
}
