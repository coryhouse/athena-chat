import { Route, Routes, Link } from "react-router-dom";
import { About } from "./About";
import { Chat } from "./Chat";

export function App() {
  return (
    <>
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
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
