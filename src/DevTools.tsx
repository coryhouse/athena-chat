import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import Select from "@athena/forge/Select";
import { useEffect, useState } from "react";
import { deleteMessage } from "./api/messagesApi";
import { getUsers } from "./api/userApi";
import { SentMessage, User } from "./types";

type DevToolsProps = {
  user: User;
  setUser: (user: User) => void;
  messages: SentMessage[];
  setMessages: (sentMessages: SentMessage[]) => void;
};

export default function DevTools({
  setUser,
  user,
  messages,
  setMessages,
}: DevToolsProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function init() {
      const _users = await getUsers();
      setUsers(_users);
    }
    init();
  }, []); // only run once

  return (
    <Form
      includeSubmitButton={false}
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "lightblue",
        padding: 16,
      }}
    >
      <FormField
        inputAs={Select}
        id="select-user"
        labelText="Select user"
        onChange={(event) => {
          const user = users.find(
            (u) => u.username === event.currentTarget.value
          );
          setUser(user!);
        }}
        options={users.map((u) => u.username)}
        value={user.username}
      />

      <FormField
        inputAs={Select}
        id="delete-message"
        labelText="Message to Delete"
        onChange={async (event) => {
          const id = parseInt(event.currentTarget.value);
          await deleteMessage(id);
          setMessages(messages.filter((m) => m.id !== id));
        }}
        options={messages.map((m) => {
          return { text: m.message, value: m.id };
        })}
        value={""}
      />
    </Form>
  );
}
