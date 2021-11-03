export async function getMessages() {
  const resp = await fetch("http://localhost:3001/messages");
  if (!resp.ok) throw resp;
  return resp.json();
}
