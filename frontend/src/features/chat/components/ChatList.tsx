import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/types/AiChatbot/Message";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import ChatForm from "./ChatForm";
import { useNavigate, useParams } from "react-router";
import { useSidebar } from "@/components/ui/sidebar";

const ChatList = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { open } = useSidebar();

  const { data, mutate } = useFrappeGetDocList<Message>("Message", {
    fields: ["text", "type", "name"],
    filters: [["conversation", "=", conversationId + ""]],
  });

  useFrappeDocTypeEventListener("Message", () => {
    mutate();
  });

  return (
    <div className={`relative h-full pt-10 `}>
      <div className="absolute top-2 right-2">
        <Button
          size="icon"
          variant="outline"
          className="ml-auto rounded-full"
          onClick={() => navigate("/")}
        >
          <Plus />
        </Button>
      </div>

      <div className="space-y-4 flex flex-col overflow-y-auto">
        {data?.map((message) => (
          <div
            key={message.name}
            className={`p-2.5 rounded-lg ${
              message.type === "User"
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-muted max-w-[75%]"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 right-0 p-2.5">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatList;
