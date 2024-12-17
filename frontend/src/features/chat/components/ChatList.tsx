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
    <div
      className={`relative h-full pt-10 ${
        open ? "md:w-[calc(100%-16rem)]" : ""
      }`}
    >
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

      <div className="space-y-4 ">
        {data?.map((message) => (
          <div
            key={message.name}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.type === "User"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
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
