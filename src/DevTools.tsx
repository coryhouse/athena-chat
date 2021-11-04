import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import Select from "@athena/forge/Select";
import { User } from "./types";

type DevToolsProps = {
  users: User[];
};

export function DevTools({ users }: DevToolsProps) {
  <Form>
    <FormField
      inputAs={Select}
      id="select-user"
      labelText="Select user"
      options={users.map((u) => u.username)}
    />
  </Form>;
}
