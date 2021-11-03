// Named import
import Form from "@athena/forge/Form";
import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import Textarea from "@athena/forge/Textarea";
import FormField from "@athena/forge/FormField";
import Button from "@athena/forge/Button";
import { useEffect, useState } from "react";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { getMessages } from "./api/messagesApi";
import { SentMessage } from "./types";

export function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<SentMessage[]>([]);

  useEffect(() => {
    async function getInitialMessages() {
      const _messages = await getMessages();
      setMessages(_messages);
    }
    getInitialMessages();
  }, []); // Only run this once.

  return (
    <Root>
      <h1>Chat</h1>

      <List>
        {messages.map((m, index) => (
          <ListItem key={index}>{m.message}</ListItem>
        ))}
      </List>

      <Form
        includeSubmitButton={false}
        onSubmit={(event) => {
          event.preventDefault(); // Don't post back to the server

          //   const unsavedMessage: UnsentMessage = {
          //     date: new Date().toISOString(),
          //     message: message,
          //     recipientUserId: 1,
          //     senderUserId: 2,
          //   };

          setMessages([...messages]);
          setMessage(""); // clear the message input since it was just submitted
        }}
      >
        <FormField
          labelAlwaysAbove
          labelText="Message"
          id="message"
          inputAs={Textarea}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Button type="submit" text="Send" disabled={!message} />
      </Form>
    </Root>
  );
}
