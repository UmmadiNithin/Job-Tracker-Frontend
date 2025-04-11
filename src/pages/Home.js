import "./Home.css";
import { FaRocket } from "react-icons/fa"; // You can replace this with FaBriefcase, FaBullseye, etc.

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        <FaRocket style={{ marginRight: "10px", color: "#35a0ca" }} />
        Welcome to Job Tracker
      </h1>
      <p className="home-subtitle">Launch your career journey with confidence 🚀</p>
    </div>
  );
};

export default Home;
