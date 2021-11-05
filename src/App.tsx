import { Route, Routes } from "react-router";
import { About } from "./About";
import { Chat } from "./Chat";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
