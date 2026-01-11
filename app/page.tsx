import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <div className="hero-bg" id="hero">
        <div className="hero-text">
          <div>
            <h1>banana</h1>
          </div>
          <div>
            <h1>o</h1>
          </div>
          <div>
            <h1>meter</h1>
          </div>
        </div>
        <img
          className="hero-bg-banana"
          src="/hero-bg1.png"
          alt="banana image for hero section"
        />
        <img
          className="hero-bg-banana"
          src="/hero-bg2.png"
          alt="banana image for hero section"
          style={{ zIndex: "3" }}
        />
      </div>
    </div>
  );
}
