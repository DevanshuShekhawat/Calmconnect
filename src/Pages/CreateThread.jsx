import React, { useState, useContext } from "react";
import { AiOutlineClose, AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { createThread } from "../API/Firestore";
import { FirestoreContext } from "../Contexts/FirestoreContext";

export default function CreateThread() {
  let { currentUser } = useContext(FirestoreContext);
  let currentUserID = currentUser[0]?.id;

  let userName = localStorage.getItem("username");
  let userEmail = localStorage.getItem("userEmail");

  const [threadData, setThreadData] = useState([
    {
      thread: "",
      placeholder: "Start a POST...",
    },
  ]);
  let navigate = useNavigate();

  const getThreadData = (event, index) => {
    let data = [...threadData];

    data[index][event.target.name] = event.target.value;

    setThreadData(data);
  };

  const addThread = () => {
    let thread = { thread: "", placeholder: "Start a POST..." };

    setThreadData([...threadData, thread]);
  };

  const deleteThread = (index) => {
    let data = [...threadData];
    data.splice(index, 1);
    setThreadData(data);
  };

  const postThread = async () => {
    let payload = {
      currentUserID: currentUserID,
      name: userName,
      email: userEmail,
      threadData: threadData.map((item) => item.thread),
    };

    await createThread(payload);
    navigate("/posts");
  };

  return (
    <div className="create-thread-container">
      <div className="create-thread">
        <AiOutlineClose
          size={25}
          className="react-icon"
          onClick={() => navigate("/posts")}
        />

        <p>New Post</p>
      </div>

      <p className="current-user">{userName}</p>
      <div className="threads-area">
        {threadData.map((item, index) => (
          <div key={index}>
            <textarea
              placeholder={item.placeholder}
              className="thread-body"
              name="thread"
              rows={5}
              cols={50}
              value={item.thread}
              onChange={(event) => getThreadData(event, index)}
            ></textarea>

            <AiFillCloseCircle
              onClick={() => deleteThread(index)}
              size={20}
              className="delete-thread"
            />
          </div>
        ))}
      </div>
      <div className="post-btn-container">
        <button className="post-thread" onClick={addThread}>
          Add ...
        </button>
        <button
          onClick={postThread}
          className={`${
            threadData.length === 0 ? "disabled" : ""
          } post-thread `}
          disabled={threadData.length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
}
