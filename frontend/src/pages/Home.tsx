import { useFrappeGetDocList } from "frappe-react-sdk";

type Props = {};

const Home = (props: Props) => {
  const { data } = useFrappeGetDocList("User");

  console.log(data);

  return (
    <div>
      <ul>
        {data?.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
