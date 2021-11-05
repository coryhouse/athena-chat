import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import React, { Suspense, useEffect, useState } from "react";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { getMessages, sendMessage } from "./api/messagesApi";
import { SentMessage, UnsentMessage, User } from "./types";
import { MessageForm } from "./MessageForm";
import { getUsers } from "./api/userApi";

// Lazy loading dev tools so that production users never get this code.
const DevTools = React.lazy(() => import("./DevTools"));

export function Chat() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    id: 3,
    username: "jeffsalinas",
  });

  useEffect(() => {
    async function init() {
      const _users = await getUsers();
      setUsers(_users);
    }
    init();
  }, []); // only run once

  useEffect(() => {
    async function getInitialData() {
      const _messages = await getMessages(user.id);
      setMessages(_messages);
    }
    getInitialData();
  }, [user.id]); // Re-run when the user.id changes.

  async function handleSubmit(unsentMessage: UnsentMessage): Promise<void> {
    // TODO: Handle loading state. Consider optimistic update.
    const sentMessage = await sendMessage(unsentMessage);
    setMessages([...messages, sentMessage]);
  }

  return (
    <Root>
      <header style={{ backgroundColor: "orange", padding: 16 }}>
        <h2>Hi {user.username}</h2>
      </header>

      <section aria-labelledby="chat-heading" id="chat-section" role="article">
        <h1 id="chat-heading">Chat</h1>

        <List>
          {messages.map((m, index) => (
            <ListItem key={index}>{m.message}</ListItem>
          ))}
        </List>

        <MessageForm onSubmit={handleSubmit} />
      </section>

      <Suspense fallback="Loading...">
        {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
          <DevTools
            users={users}
            setUser={setUser}
            user={user}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </Suspense>
    </Root>
  );
}
