"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

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
        <img className="footer-image2" src="/footer2.png" alt="footer image" />
        <img className="footer-image3" src="/footer3.png" alt="footer image" />
        <img className="footer-image1" src="/footer1.png" alt="footer image" />
        <div id="Meter">
          <div className="meter-content">
            <div className="m-c-upload">
              <img src="/upload.png" alt="upload icon" />
              <h5>Unggah foto kamu</h5>
              <h6>Drag & drop foto kamu atau klik area ini.</h6>
              <input type="file" name="" id="" />
            </div>
            <div className="m-c-info">
              <img src="/banana-image.png" alt="banana image" />
              <h3>Informasi mu akan muncul disini nanti</h3>
            </div>
          </div>
        </div>
        <div id="About">
          <div className="about-content">
            <div className="about-image">
              <button
                title="Google Colab"
                className="a-i-1"
                onClick={() => open("https://colab.google/")}
              >
                <img src="/g-colab.png" alt="gogole colab logo" />
              </button>
              <button
                title="NextJs"
                className="a-i-2"
                onClick={() => open("https://nextjs.org/")}
              >
                <img src="/next.png" alt="next js logo" />
              </button>
              <button
                title="FastApi"
                className="a-i-3"
                onClick={() => open("https://fastapi.tiangolo.com/")}
              >
                <img src="/fastapi.png" alt="fastApi logo" />
              </button>
              <button
                title="GitHub"
                className="a-i-4"
                onClick={() => open("https://github.com/")}
              >
                <img src="/github.png" alt="github logo" />
              </button>
              <button
                title="TypeScript"
                className="a-i-5"
                onClick={() => open("https://www.typescriptlang.org/")}
              >
                <img src="/ts.png" alt="typescript logo" />
              </button>
              <button
                title="Vercel"
                className="a-i-6"
                onClick={() => open("https://vercel.com/")}
              >
                <img src="/vercel.png" alt="vercel logo" />
              </button>
              <button
                title="Hugging Face"
                className="a-i-7"
                onClick={() => open("https://huggingface.co/")}
              >
                <img src="/hf.png" alt="hugging face logo" />
              </button>
            </div>
            <div className="about-desc">
              <div className="a-d-title">
                <h4>System Architecture</h4>
                <p>
                  Sistem deteksi cerdas berbasis Web-App yang mengintegrasikan
                  model CNN untuk mengklasifikasi kematangan serta mengestimasi
                  kadar gula dan masa konsumsi pisang secara otomatis .
                </p>
                <div className="a-d-t-link">
                  <Link href={"#"}>
                    <img src="/link-git.png" alt="github link logo" />
                    <h5>Repository GitHub</h5>
                    <img src="/arrow.png" alt="arrow icon" />
                  </Link>
                  <Link href={"#"}>
                    <img src="/link-linkedin.png" alt="github link logo" />
                    <h5>Profil Saya</h5>
                    <img src="/arrow.png" alt="arrow icon" />
                  </Link>
                </div>
              </div>
              <div className="a-d-algoritm">
                <div className="a-d-a-content">
                  <h5>CNN (Convolutional Neural Network)</h5>
                </div>
                <div className="a-d-a-content">
                  <h5>TensorFlow</h5>
                </div>
                <div className="a-d-a-content">
                  <h5>CNumpy</h5>
                </div>
                <div className="a-d-a-content">
                  <h5>OpenCV</h5>
                </div>
                <div className="a-d-a-content">
                  <h5>YOLO</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
