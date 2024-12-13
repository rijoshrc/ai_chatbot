import ConversationList from "@/features/conversation/components/ConversationList";
import CreateConversation from "@/features/conversation/components/CreateConversation";
import { Button } from "@/components/ui/button";
import { useFrappeAuth } from "frappe-react-sdk";

type Props = {};

const HomePage = (props: Props) => {
  const { logout } = useFrappeAuth();
  return (
    <div className="">
      <ConversationList />
      <CreateConversation />
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomePage;
