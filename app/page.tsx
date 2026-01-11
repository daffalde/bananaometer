"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  return (
    <div className="container">
      <div className="hero-bg" id="Hero">
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
        <div className="hero-content">
          <Navbar color={inView ? "#404040" : "#faf6eb"} />
          <div className="hero-desc">
            <p>
              Cukup unggah foto, dan sistem Machine Learning kami akan
              menganalisis tingkat kematangan, kadar gula, serta estimasi waktu
              terbaik untuk dikonsumsi.
            </p>
          </div>
        </div>
      </div>
      <div ref={ref} className="meter">
        <div id="Meter"></div>
        <div id="About"></div>
      </div>
    </div>
  );
}
