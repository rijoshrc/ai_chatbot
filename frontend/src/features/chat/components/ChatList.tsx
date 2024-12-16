import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Message } from "@/types/AiChatbot/Message";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import ChatForm from "./ChatForm";

const ChatList = () => {
  const [open, setOpen] = React.useState(false);

  const { data, mutate } = useFrappeGetDocList<Message>("Message", {
    fields: ["text", "type", "name"],
    filters: [["conversation", "=", "CN-0007"]],
  });

  useFrappeDocTypeEventListener("Message", () => {
    mutate();
  });

  return (
    <div className="relative h-full pt-10">
      <div className="absolute top-2 right-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="ml-auto rounded-full"
                onClick={() => setOpen(true)}
              >
                <Plus />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>Tsasad</div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
