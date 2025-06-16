import { Link } from "react-router-dom";
import "./home.css"; // Import raw CSS

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Bug Bounty Tools</h1>
        <div className="button-list">
          {/* <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/xss" className="btn">
            XSS Test
          </Link> */}
          <Link to="/alienvault" className="btn">
            AlienVault
          </Link>
          <Link to="/punycode" className="btn">
            Punycode Generator
          </Link>
        </div>
      </div>
    </div>
  );
}
