import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Conversation } from "@/types/AiChatbot/Conversation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  file: z
    .custom<FileList>(
      (value) => value instanceof FileList && value.length > 0,
      {
        message: "File is required",
      }
    )
    .refine((files) => files[0]?.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .optional(),
});

type Props = {};

const CreateConversation = (props: Props) => {
  const { createDoc } = useFrappeCreateDoc<Conversation>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // createDoc("Conversation", values);

    console.log(typeof values.file, values.file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Start conversation</Button>
      </form>
    </Form>
  );
};

export default CreateConversation;
