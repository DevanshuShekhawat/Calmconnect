import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import SingleThread from "./SingleThread";
import { BsCcCircle } from "react-icons/bs";
import { Divider } from "antd";

export default function Threads() {
  let { threads } = useContext(FirestoreContext);
  let auth = getAuth();
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (!response) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="threads-main">
      <div className="thread-icon-container">
      <BsCcCircle 
      size={70}  //className='filled'
      style={{ 
        margin: '20px',   
      }}
      />
      </div>
      <div className="single-threads">
        {threads.map((thread, index) => {
          return (
            <div key={index}>
              <SingleThread thread={thread} />
              <Divider className="divider" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
