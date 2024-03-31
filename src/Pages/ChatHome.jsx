import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";

import { database, auth, storage } from "../firebaseConfig";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function UsersComponent(props) {
    const handleToggle = (username, userId) => {
        props.setReceiverData({
            username: username,
            userId: userId,
        });

        props.navigate(`/chat-home/${userId}`); // Fixed string interpolation here
    };

    console.log(props.users); // Log the users array to inspect profile image URLs

    return (
        <List
            dense
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
            }}
        >
            {props.users?.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${value}`;

                if (props.currentUserId !== value.userId)
                    return (
                        <ListItem key={value.userId} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    handleToggle(value.username, value.userId);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={value.username}
                                        src={value.profileImageUrl || `${value.username}.jpg`} // Fixed string interpolation here
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    id={labelId}
                                    primary={value.username}
                                    primaryTypographyProps={{ style: { fontSize: "1.5rem" } }} // Adjusted font size here
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                else return null;
            })}
        </List>
    );
}


export default function ChatHome() {
    const [users, setUsers] = useState([]);

    const [receiverData, setReceiverData] = useState(null);
    const [chatMessage, setChatMessage] = useState({
        text: "",
        image: null,
    });

    const [allMessages, setAllMessages] = useState([]);

    const user = auth.currentUser;

    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(collection(database, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => ({
                ...doc.data(),
                profileImageUrl: doc.data().profileImageUrl || null // Assuming profile image URL is stored under 'profileImageUrl' field
            })));
        });
        return unsub;
    }, []);

    useEffect(() => {
        if (receiverData) {
            const unsub = onSnapshot(
                query(
                    collection(
                        database,
                        "users",
                        user?.uid,
                        "chatUsers",
                        receiverData?.userId,
                        "messages"
                    ),
                    orderBy("timestamp")
                ),
                (snapshot) => {
                    setAllMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            messages: doc.data(),
                        }))
                    );
                }
            );
            return unsub;
        }
    }, [receiverData?.userId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setChatMessage((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const sendMessage = async () => {
        try {
            if (user && receiverData) {
                // Check if there's a text message
                if (chatMessage.text.trim() !== "") {
                    await addDoc(
                        collection(
                            database,
                            "users",
                            user.uid,
                            "chatUsers",
                            receiverData.userId,
                            "messages"
                        ),
                        {
                            username: user.displayName,
                            messageUserId: user.uid,
                            message: chatMessage.text,
                            timestamp: new Date(),
                        }
                    );

                    await addDoc(
                        collection(
                            database,
                            "users",
                            receiverData.userId,
                            "chatUsers",
                            user.uid,
                            "messages"
                        ),
                        {
                            username: user.displayName,
                            messageUserId: user.uid,
                            message: chatMessage.text,
                            timestamp: new Date(),
                        }
                    );
                }

                // Check if there's an image
                if (chatMessage.image) {
                    const storageRef = ref(
                        storage,
                        `${user.uid}/${receiverData.userId}/${chatMessage.image.name}` // Fixed string interpolation here
                    );
                    await uploadBytes(storageRef, chatMessage.image);
                    const imageUrl = await getDownloadURL(storageRef);

                    await addDoc(
                        collection(
                            database,
                            "users",
                            user.uid,
                            "chatUsers",
                            receiverData.userId,
                            "messages"
                        ),
                        {
                            username: user.displayName,
                            messageUserId: user.uid,
                            imageUrl,
                            timestamp: new Date(),
                        }
                    );

                    await addDoc(
                        collection(
                            database,
                            "users",
                            receiverData.userId,
                            "chatUsers",
                            user.uid,
                            "messages"
                        ),
                        {
                            username: user.displayName,
                            messageUserId: user.uid,
                            imageUrl,
                            timestamp: new Date(),
                        }
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }

        // Clear the input fields after sending the message
        setChatMessage({
            text: "",
            image: null,
        });
    };

    return (
        <div style={root}>
            <Paper style={left}>
                <div
                    style={{
                        display: "flex",
                        padding: 5,
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h4" style={{ margin: 0 }}>
                        {user?.displayName}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => {
                            // auth.signOut();
                            navigate("/posts");
                        }}
                        style={{ fontSize: "1.5rem" }} // Adjusted font size here
                    >
                        Back
                    </Button>
                </div>
                <Divider />
                <Typography variant="h6" style={{ margin: 10, fontSize: "1.5rem" }}> {/* Adjusted font size here */}
                    All users
                </Typography>
                <div style={{ overflowY: "scroll" }}>
                    <UsersComponent
                        users={users}
                        setReceiverData={setReceiverData}
                        navigate={navigate}
                        currentUserId={user?.uid}
                    />
                </div>
            </Paper>

            <Paper style={right}>
                <Typography variant="h4" style={{ margin: 2, padding: 10 }}>
                    {receiverData ? receiverData.username : user?.displayName}
                </Typography>

                <Divider />
                <div style={messagesDiv}>
                    {/* messages area */}
                    {allMessages &&
                        allMessages.map(({ id, messages }) => {
                            return (
                                <div
                                    key={id}
                                    style={{
                                        margin: 2,
                                        display: "flex",
                                        flexDirection:
                                            user?.uid === messages.messageUserId
                                                ? "row-reverse"
                                                : "row",
                                    }}
                                >
                                    {messages.message && (
                                        <span
                                            style={{
                                                backgroundColor: "#BB8FCE",
                                                padding: 6,
                                                borderTopLeftRadius:
                                                    user?.uid === messages.messageUserId ? 10 : 0,
                                                borderTopRightRadius:
                                                    user?.uid === messages.messageUserId ? 0 : 10,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                maxWidth: 400,
                                                fontSize: "1.7rem", // Adjusted font size here
                                                textAlign:
                                                    user?.uid === messages.messageUserId ? "right" : "left",
                                            }}
                                        >
                                            {messages.message}
                                        </span>
                                    )}
                                    {messages.imageUrl && (
                                        <img
                                            src={messages.imageUrl}
                                            alt="Sent Image"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "300px",
                                                width: "auto",
                                                height: "auto",
                                                borderRadius: 10,
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                </div>

                <div style={{ width: "100%", display: "flex", flex: 0.08 }}>
                    <input
                        value={chatMessage.text}
                        onChange={(e) =>
                            setChatMessage({ ...chatMessage, text: e.target.value })
                        }
                        style={{ ...input, fontSize: "1.4rem" }}
                        type="text"
                        placeholder="Type message..."
                    />
                    <IconButton component="label">
                        <AttachmentIcon fontSize="large" />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </IconButton>
                    <IconButton onClick={sendMessage}>
                        <SendIcon style={{ margin: 10, fontSize: "2rem" }} />
                    </IconButton>
                </div>
            </Paper>
        </div>
    );
}

const root = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
};

const left = {
    display: "flex",
    flex: 0.2,
    height: "95vh",
    margin: 10,
    flexDirection: "column",
};

const right = {
    display: "flex",
    flex: 0.8,
    height: "95vh",
    margin: 10,
    flexDirection: "column",
};

const input = {
    flex: 1,
    outline: "none",
    borderRadius: 5,
    border: "none",
};

const messagesDiv = {
    backgroundColor: "#303030",
    padding: 5,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxHeight: 460,
    overflowY: "scroll",
};
