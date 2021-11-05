import { Route, Routes, Link } from "react-router-dom";
import { About } from "./About";
import { Chat } from "./Chat";
import Root from "@athena/forge/Root";
import { lazy, Suspense, useEffect, useState } from "react";
import { SentMessage, User } from "./types";
import { getMessages } from "./api/messagesApi";

// Lazy loading dev tools so that production users never get this code.
const DevTools = lazy(() => import("./DevTools"));

export function App() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [user, setUser] = useState<User>({
    id: 3,
    username: "jeffsalinas",
  });

  useEffect(() => {
    async function getInitialData() {
      const _messages = await getMessages(user.id);
      setMessages(_messages);
    }
    getInitialData();
  }, [user.id]); // Re-run when the user.id changes.

  return (
    <Root>
      <header style={{ backgroundColor: "orange", padding: 16 }}>
        <h2>Hi {user.username}</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Chat</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={<Chat messages={messages} setMessages={setMessages} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Suspense fallback="Loading...">
        {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
          <DevTools
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
