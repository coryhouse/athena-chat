// Named import
import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import React, { useEffect, useState } from "react";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { getMessages, sendMessage } from "./api/messagesApi";
import { SentMessage, UnsentMessage, User } from "./types";
import { MessageForm } from "./MessageForm";
import { DevTools } from "./DevTools";
import { getUsers } from "./api/userApi";

export function App() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    id: 3,
    username: "jeffsalinas",
  });

  useEffect(() => {
    async function getInitialData() {
      // TODO: Use Promise.all for performance
      const _messages = await getMessages();
      const _users = await getUsers();
      setMessages(_messages);
      setUsers(_users);
    }
    getInitialData();
  }, []); // Only run this once.

  async function handleSubmit(unsentMessage: UnsentMessage): Promise<void> {
    // TODO: Handle loading state. Consider optimistic update.
    const sentMessage = await sendMessage(unsentMessage);
    setMessages([...messages, sentMessage]);
  }

  return (
    <Root>
      <h1>Chat</h1>
      <h2>Hi {user.username}</h2>

      <List>
        {messages.map((m, index) => (
          <ListItem key={index}>{m.message}</ListItem>
        ))}
      </List>

      <MessageForm onSubmit={handleSubmit} />
      {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
        <DevTools users={users} setUser={setUser} user={user} />
      )}
    </Root>
  );
}
