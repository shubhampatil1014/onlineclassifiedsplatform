import { useEffect, useState } from "react";
import { getChats } from "./api/Api";

export default function Chats() {

    const [chats,setChats] = useState([]);

    useEffect(() => {
        const getChatsForUser = async () => {
            const userChats = await getChats();
            setChats(userChats);
        }
        getChatsForUser();
    },[]);

    const sendMessage = function () {

    }

    const openChat = async () => {

    }

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
                }

                #chatList li:hover {
                    background: #e6f3ff;
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
                    padding: 15px;
                    overflow-y: auto;
                    background: #f2f2f2;
                    display: flex;
                    flex-direction: column;
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
                .removeFile{
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
                .filename{
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
                    <div className="chat-inbox">
                        <h3>Inbox</h3>
                        <ul id="chatList">
                            {chats.length > 0 && chats.map((chat) => {
                                {chat.isSet === "Y" ? 
                                <li id={`user${chat.to}`} onClick={() => openChat(chat.to,chat.senderName)}>chat.senderName</li> : 
                                <li id={`user${chat.from}`} onClick={() => openChat(chat.from,chat.senderName)}>chat.senderName</li>}
                            })}
                        </ul>
                    </div>

                    <div className="chat-panel">
                        <div className="chat-header" id="chatHeader">Select a
                            conversation</div>
                        <div className="chat-body" id="chatMessages">
                        </div>
                        <div className="chat-footer">
                            <input type="text" id="messageInput"
                                placeholder="Type a message..." />
                            <label htmlFor="fileInput" style={{ cursor: "pointer" }}> &#128206;
                            </label> <input type="file" id="fileInput" style={{ display: "none" }} />
                            <span id="filePreview"
                                style={{ display: "none", width: "150px", position: "relative", fontSize: "15px", color: "darkslategray", backgroundColor: "wheat", textAlign: "right", padding: "5px", margin: "5px", borderRadius: "15px" }}></span>
                            <button onClick={() => sendMessage()}>Send</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}