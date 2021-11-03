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

  return (
    <Root>
      <h1>Chat</h1>
      <Form includeSubmitButton={false}>
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
