// Named import
import Form from "@athena/forge/Form";
import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import Textarea from "@athena/forge/Textarea";
import FormField from "@athena/forge/FormField";
import Button from "@athena/forge/Button";
import { useState } from "react";

export function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <Root>
      <h1>Chat</h1>
      <Form
        includeSubmitButton={false}
        onSubmit={(event) => {
          event.preventDefault(); // Don't post back to the server
          setMessages([...messages, message]);
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
