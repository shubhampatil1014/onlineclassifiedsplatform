// src/hooks/useStompClient.js
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_BASE_URL, STATIC_CONTENT_PATH } from "./config";

export default function useStompClient(ownerId, onMessageReceived) {
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(`${API_BASE_URL}/ws`); // match your Spring Boot endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP:", msg),
    });

    client.onConnect = () => {
      console.log("✅ Connected to STOMP");

      // subscribe to private queue
      client.subscribe("/user/queue/messages", (message) => {
        const chatMessage = JSON.parse(message.body);
        console.log("📩 Received:", chatMessage);

        if (ownerId === chatMessage.from) {
          // received message
          let msgHtml = `<div class="chat-message received">${chatMessage.messagetext}</div>`;
          if (chatMessage.mediaUrl && chatMessage.mediaUrl.length > 0) {
            const filePath = chatMessage.mediaUrl.substring(
              chatMessage.mediaUrl.lastIndexOf("/media")
            );
            msgHtml = `<div class="chat-message received">
                          <div><img src="${STATIC_CONTENT_PATH}/${filePath}" width="200" height="200"/></div>
                          ${chatMessage.messagetext}
                       </div>`;
          }

          // let parent component handle UI updates
          if (onMessageReceived) {
            onMessageReceived(msgHtml, chatMessage);
          }
        } else {
          // highlight user list
          if (onMessageReceived) {
            onMessageReceived(
              `<span style="color:red">1</span>`,
              chatMessage,
              "notification"
            );
          }
        }
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [ownerId, onMessageReceived]);

  return clientRef;
}
