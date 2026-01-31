import { useEffect, useRef, useState } from "react";
import { getChats, getChatsByOwner, uploadMedia } from "./api/Api";
import { useLocation } from "react-router-dom";
import { STATIC_CONTENT_PATH } from "./config";
import useStompClient from "./WebSocketContext";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [ownerName, setOwnerName] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [unreadCounts, setUnreadCounts] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [messageText, setMessageText] = useState("");

    const chatBodyRef = useRef(null);

    const location = useLocation();
    const stompClient = useStompClient(ownerId, (msgHtml, chatMessage, type) => {
        if (String(chatMessage.from) === String(ownerId)) {
            setChatMessages((prev) => [
                ...prev,
                { ...chatMessage, isSent: "N" },
            ]);
        } else {
            setChats((prevChats) => {
                const exists = prevChats.some(
                    (c) => c.from === chatMessage.from || c.to === chatMessage.from
                );
                if (!exists) {
                    return [
                        ...prevChats,
                        {
                            from: chatMessage.from,
                            senderName: chatMessage.senderName,
                            isSent: "N",
                        },
                    ];
                }
                return prevChats;
            });
            setUnreadCounts((prev) => ({
                ...prev,
                [chatMessage.from]: (prev[chatMessage.from] || 0) + 1,
            }));
        }
    });

    // Auto-scroll chat body when messages change
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        const getChatsForUser = async () => {
            const userChats = await getChats();
            setChats(userChats);
        };
        getChatsForUser();
        setChatMessages([]);
        const queryParams = new URLSearchParams(location.search);
        const OwnerId = queryParams.get("ownerId");
        const OwnerName = queryParams.get("name");
        setOwnerId(OwnerId);
        if (OwnerId && OwnerName) {
            openChat(OwnerId, OwnerName);
        }
    }, [location.search]);

    const openChat = async (OwnerId, OwnerName) => {
        setChatMessages([]);
        setOwnerName(OwnerName);
        setOwnerId(OwnerId);
        setUnreadCounts((prev) => {
            const updated = { ...prev };
            delete updated[OwnerId];
            return updated;
        });

        const response = await getChatsByOwner(OwnerId);
        setChatMessages(response);
    };

    const removeFile = function () {
        document.getElementById("fileInput").value="";
        setSelectedFile();
    }

    const sendMessage = async () => {
        let mediaUrl = null;

        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("fileType", selectedFile.type);

                const data = await uploadMedia(formData);
                if (data && data.status === "success" && data.url) {
                    mediaUrl = data.url;
                }
            }

            if (messageText.trim() || mediaUrl) {
                // Optimistic render
                setChatMessages((prev) => [
                    ...prev,
                    { to: ownerId, messagetext: messageText, mediaUrl, isSent: "Y" },
                ]);

                const chatMessage = {
                    to: ownerId,
                    messagetext: messageText,
                    mediaUrl: mediaUrl,
                };

                // ✅ FIX: use publish, not send
                if (stompClient.current && stompClient.current.connected) {
                    stompClient.current.publish({
                        destination: "/app/chat",
                        body: JSON.stringify(chatMessage),
                    });
                } else {
                    console.error("STOMP client not connected");
                }

                setMessageText("");
                setSelectedFile(null);
            }
        } catch (err) {
            console.error("Media upload failed", err);
        }
    };

    return (
        <>
            <style>
                {`
        .chat-container {
          display: flex;
          height: 500px;
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin: 40px auto;
          width: 90%;
          max-width: 1000px;
          background: #fff;
        }
        .chat-inbox {
          width: 30%;
          background: #f7f7f7;
          border-right: 1px solid #ddd;
          overflow-y: auto;
          padding: 10px;
        }
        .chat-inbox h3 {
          margin: 0;
          padding: 10px 0;
          font-size: 18px;
          color: #333;
          text-align: center;
          border-bottom: 1px solid #ccc;
        }
        #chatList {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        #chatList li {
          padding: 12px 10px;
          margin-bottom: 5px;
          background: burlywood;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #chatList li:hover {
          background: #e6f3ff;
        }
        .unread-badge {
          background: red;
          color: white;
          font-size: 12px;
          border-radius: 50%;
          padding: 2px 6px;
          margin-left: 6px;
        }
        .chat-panel {
          width: 70%;
          display: flex;
          flex-direction: column;
          background: #fff;
        }
        .chat-header {
          background: #121435;
          color: white;
          padding: 15px;
          font-size: 18px;
          font-weight: bold;
        }
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          background: #f2f2f2;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .chat-message {
          margin: 8px 0;
          padding: 10px;
          border-radius: 8px;
          max-width: 75%;
          word-wrap: break-word;
        }
        .chat-message.sent {
          background: #cce5ff;
          align-self: flex-end;
          text-align: right;
        }
        .chat-message.received {
          background: #e2e3e5;
          align-self: flex-start;
          text-align: left;
        }
        .chat-footer {
          display: flex;
          border-top: 1px solid #ccc;
          padding: 10px;
          background: #fff;
        }
        .chat-footer input {
          flex: 1;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
        }
        .chat-footer button {
          padding: 10px 15px;
          margin-left: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .chat-footer button#uploadMedia {
          background: #28a745;
          margin-left: 10px;
        }
        .chat-footer button#uploadMedia:hover {
          background: #1e7e34;
        }
        .chat-footer button:hover {
          background: #0056b3;
        }
        #filePreview {
          width: 150px; 
          position: relative; 
          font-size: 15px; 
          color: darkslategray; 
          background-color: wheat; 
          text-align: right; 
          padding: 5px; 
          margin: 5px; 
          border-radius: 15px;
        }
        .removeFile {
          font-size: larger;
          position: absolute;
          right: 5px;
          bottom: 3px;
          cursor: pointer;
          color: red;
          padding: 0px 5px;
          background-color: aliceblue;
          border-radius: 50%;
        }
        .filename {
          text-align: left;
          width: 130px;
          float: left;
          overflow: hidden;
          font-size: 15px;
          color: darkslategray;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}
            </style>
            <div className="main">
                <div className="chat-container">
                    {/* Inbox */}
                    <div className="chat-inbox">
                        <h3>Inbox</h3>
                        <ul id="chatList">
                            {chats.map((chat) => {
                                const userId = chat.isSent === "Y" ? chat.to : chat.from;
                                return (
                                    <li
                                        key={userId}
                                        id={`user${userId}`}
                                        onClick={() => openChat(userId, chat.senderName)}
                                    >
                                        <span>{chat.senderName}</span>
                                        {unreadCounts[userId] && (
                                            <span className="unread-badge">{unreadCounts[userId]}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Chat Panel */}
                    <div className="chat-panel">
                        <div className="chat-header">
                            {ownerName ? ownerName : "Select a conversation"}
                        </div>
                        <div ref={chatBodyRef} className="chat-body" id="chatMessages">
                            {chatMessages.map((message, index) => {
                                const mediaElement =
                                    message.mediaUrl && message.mediaUrl.length > 0 ? (
                                        <div>
                                            {message.mediaUrl.toLowerCase().endsWith(".mp4") ? (
                                                <video width="200" height="200" controls preload="metadata">
                                                    <source
                                                        src={`${STATIC_CONTENT_PATH}/${message.mediaUrl}`}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            ) : (
                                                <img
                                                    alt="media"
                                                    src={`${STATIC_CONTENT_PATH}/${message.mediaUrl}`}
                                                    width="200"
                                                    height="200"
                                                />
                                            )}
                                        </div>
                                    ) : null;
                                return message.isSent === "Y" ? (
                                    <div key={index} className="chat-message sent">
                                        {mediaElement}
                                        {message.messagetext}
                                    </div>
                                ) : (
                                    <div key={index} className="chat-message received">
                                        {mediaElement}
                                        {message.messagetext}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="chat-footer">
                            <input
                                name="messageText"
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Type a message..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                            />
                            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                                📎
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />

                            {selectedFile &&
                                <span id="filePreview">
                                    <span className="filename">{selectedFile.name}</span>
                                    <span className="removeFile" onClick={removeFile}> X </span>
                                </span>
                            }

                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}