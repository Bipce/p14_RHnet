import { JSX } from "react";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {

  return (
    <div>
      Home
      <Link to={"/employee-list"}>List</Link>
    </div>
  );
};

export default Home;