import ConversationList from "@/features/conversation/components/ConversationList";
import CreateConversation from "@/features/conversation/components/CreateConversation";
import { Button } from "@/components/ui/button";
import { useFrappeAuth } from "frappe-react-sdk";
import SidebarLayout from "@/components/layouts/SidebarLayout";

type Props = {};

const HomePage = (props: Props) => {
  const { logout } = useFrappeAuth();
  return (
    <SidebarLayout>
      <ConversationList />
      <CreateConversation />
      <Button onClick={logout}>Logout</Button>
    </SidebarLayout>
  );
};

export default HomePage;
