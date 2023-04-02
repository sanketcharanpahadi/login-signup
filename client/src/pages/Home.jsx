import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      <Link to="/register" className="px-4 bg-cyan-400 text-2xl py-2">
        Register
      </Link>
    </div>
  );
};

export default Home;
