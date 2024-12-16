import SidebarLayout from "@/components/layouts/SidebarLayout";
import ChatList from "@/features/chat/components/ChatList";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <SidebarLayout>
      <ChatList />
    </SidebarLayout>
  );
};

export default HomePage;
