import "@athena/forge/dist/forge.css";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { sendMessage } from "./api/messagesApi";
import { SentMessage, UnsentMessage } from "./types";
import { MessageForm } from "./MessageForm";

type ChatProps = {
  messages: SentMessage[];
  setMessages: React.Dispatch<React.SetStateAction<SentMessage[]>>;
};

export function Chat({ messages, setMessages }: ChatProps) {
  async function handleSubmit(unsentMessage: UnsentMessage): Promise<void> {
    // TODO: Handle loading state. Consider optimistic update.
    const sentMessage = await sendMessage(unsentMessage);
    setMessages([...messages, sentMessage]);
  }

  return (
    <>
      <section aria-labelledby="chat-heading" id="chat-section" role="article">
        <h1 id="chat-heading">Chat</h1>

        <List>
          {messages.map((m, index) => (
            <ListItem key={index}>{m.message}</ListItem>
          ))}
        </List>

        <MessageForm onSubmit={handleSubmit} />
      </section>
    </>
  );
}
