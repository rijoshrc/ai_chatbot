import { Button } from "@/components/ui/button";
import { useFrappeGetDocList } from "frappe-react-sdk";

type Props = {};

const Home = (props: Props) => {
  const { data } = useFrappeGetDocList("Conversation", {
    fields: ["title", "user", "name"],
  });

  console.log(data);

  return (
    <div className="bg-red-300">
      <ul>
        {data?.map((user) => (
          <li key={user.name}>{user.title}</li>
        ))}
      </ul>

      <Button>SUbmit</Button>
    </div>
  );
};

export default Home;
