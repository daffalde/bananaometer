"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

// --- INTERFACES (Tetap dipertahankan) ---
interface dataRipe {
  success: boolean;
  warning: string | null;
  classification: { label: string; confidence: string };
  detailed_analysis: {
    brix_value: number;
    sugar_tablespoons: string;
    spot_percentage: string;
    recommendation: string;
  };
}

interface dataNonRipe {
  success: boolean;
  warning: string | null;
  classification: { label: string; confidence: string };
  detailed_analysis: {
    brix_value?: number;
    message?: string;
    recommendation: string;
  };
}

export default function Home() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  // --- LOGIKA UPLOAD & API ---
  const [gambar, setGambar] = useState<string | null>(null);
  const [data, setData] = useState<dataRipe | dataNonRipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [valueDate, setValueDate] = useState<string | null>(null);
  const [numberDate, setNumberDate] = useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (gambar) URL.revokeObjectURL(gambar);
      const imageUrl = URL.createObjectURL(file);
      setGambar(imageUrl);

      // Langsung panggil API saat file dipilih
      apiCall(file);
    }
  };

  const apiCall = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file); // Sesuaikan key "file" dengan Postman

      const response = await fetch(
        "https://daffalde-kematanganpisang.hf.space/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const hasil = await response.json();
      if (hasil.detailed_analysis.brix_value) {
        if (hasil.detailed_analysis.brix_value <= 14) {
          setValueDate("5-7 Hari");
          setNumberDate(6);
        } else if (hasil.detailed_analysis.brix_value >= 25) {
          setValueDate("1-2 Hari");
          setNumberDate(2);
        } else {
          setValueDate("2-4 Hari");
          setNumberDate(3);
        }
      }
      setData(hasil);
    } catch (error) {
      console.error("Gagal memanggil data", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            {/* --- REVISI BAGIAN UPLOAD --- */}
            <div
              className="m-c-upload"
              style={{
                backgroundImage: gambar ? `url(${gambar})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!gambar && (
                <>
                  <img src="/upload.png" alt="upload icon" />
                  <h5>Unggah foto kamu</h5>
                  <h6>Drag & drop foto kamu atau klik area ini.</h6>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* --- REVISI BAGIAN INFO --- */}
            <div className="m-c-info">
              {isLoading ? (
                <h3>Sedang Menganalisis...</h3>
              ) : data ? (
                <div
                  className="inner-info"
                  style={{ textAlign: "left", width: "100%" }}
                >
                  {data.warning ? (
                    <>
                      <div className="warning-data">
                        <p>{data.warning}</p>
                      </div>
                      <Image
                        src={"/warning.png"}
                        alt="Waring icon"
                        width={75}
                        height={75}
                      />
                    </>
                  ) : (
                    <div className="circle-percent">
                      <CircularProgressbar
                        value={parseInt(data.classification.confidence)}
                        text={`${parseInt(
                          data.classification.confidence
                        ).toString()}%`}
                        styles={buildStyles({
                          // 1. Warna Garis Progres (Path)
                          pathColor: "#FECB02",

                          // 2. Warna Angka di Tengah (Text)
                          textColor: "#404040",
                        })}
                      />
                    </div>
                  )}
                  <h2 style={{ color: "#404040" }}>
                    {data.classification.label}
                  </h2>

                  {/* Menampilkan Brix jika ada, jika tidak tampilkan Message */}
                  {"brix_value" in data.detailed_analysis ? (
                    <div className="info-gula-hari">
                      <div className="info-detail">
                        <p>Setara dengan gula :</p>
                        <div className="i-d-img">
                          {Array(
                            parseInt(
                              (data as dataRipe).detailed_analysis
                                .sugar_tablespoons
                            )
                          )
                            .fill(0)
                            .map((_, index) => (
                              <Image
                                key={index}
                                src={"/sdm.png"}
                                alt="logo sendok gula"
                                width={20}
                                height={20}
                              />
                            ))}
                        </div>
                        <h2>
                          {
                            (data as dataRipe).detailed_analysis
                              .sugar_tablespoons
                          }{" "}
                          Sdm
                        </h2>
                      </div>
                      <div className="info-detail">
                        <p>Dapat bertahan hingga :</p>
                        <div className="i-d-img">
                          {Array(numberDate)
                            .fill(0)
                            .map((_, index) => (
                              <Image
                                key={index}
                                src={"/date.png"}
                                alt="logo sendok gula"
                                width={20}
                                height={20}
                              />
                            ))}
                        </div>
                        <h2>{valueDate}</h2>
                      </div>
                    </div>
                  ) : null}

                  <p style={{ marginTop: "10px" }}>
                    <strong>Rekomendasi :</strong> <br />
                    {data.detailed_analysis.recommendation}
                  </p>
                </div>
              ) : (
                <>
                  <img src="/banana-image.png" alt="banana image" />
                  <h3>Informasi mu akan muncul disini nanti</h3>
                </>
              )}
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
                  <Link href={"https://github.com/daffalde/bananaometer"}>
                    <img src="/link-git.png" alt="github link logo" />
                    <h5>Repository GitHub</h5>
                    <img src="/arrow.png" alt="arrow icon" />
                  </Link>
                  <Link href={"https://www.linkedin.com/in/daffa-alde/"}>
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
            <div className="mobile-about-image">
              <img src="/g-colab.png" alt="Google Colab logo" />
              <img src="/next.png" alt="Next.js logo" />
              <img src="/fastapi.png" alt="FastAPI logo" />
              <img src="/github.png" alt="GitHub logo" />
              <img src="/ts.png" alt="TypeScript logo" />
              <img src="/vercel.png" alt="Vercel logo" />
              <img src="/hf.png" alt="Hugging Face logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
