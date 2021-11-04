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

export function App() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [user, setUser] = useState<User>({
    id: 1,
    username: "coryhouse",
  });

  useEffect(() => {
    async function getInitialMessages() {
      const _messages = await getMessages();
      setMessages(_messages);
    }
    getInitialMessages();
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
      <DevTools users={[]} />
    </Root>
  );
}
