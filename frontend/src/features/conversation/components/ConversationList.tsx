import { useFrappeGetDocList } from "frappe-react-sdk";

type Props = {};

const ConversationList = (props: Props) => {
  const { data } = useFrappeGetDocList("Conversation", {
    fields: ["title", "user", "name"],
  });

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.name}>{user.title}</li>
      ))}
    </ul>
  );
};

export default ConversationList;
