import ConversationList from "@/features/conversation/components/ConversationList";
import CreateConversation from "@/features/conversation/components/CreateConversation";
import { Button } from "@/components/ui/button";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <ConversationList />
      <CreateConversation />
    </div>
  );
};

export default Home;
