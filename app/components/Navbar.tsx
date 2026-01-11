import Link from "next/link";

interface NavbarProps {
  color: string;
}

export default function Navbar({ color }: NavbarProps) {
  const invertColor = color === "#404040" ? "#faf6eb" : "#404040";
  return (
    <div className="navbar">
      <div
        className={`navbar-head ${color === "#faf6eb" ? "" : "navbar-head-bg"}`}
      >
        <img
          src={color === "#404040" ? "/logo-long-black.svg" : "/logo-long.svg"}
          alt="logo banana"
        />
        <ul style={{ color: color }}>
          <li>
            <Link href={"#Hero"}>Home</Link>
          </li>
          <li>
            <Link href={"#Meter"}>Meter</Link>
          </li>
          <li>
            <Link href={"#About"}>About</Link>
          </li>
        </ul>
        <button
          style={{ backgroundColor: color, color: invertColor }}
          className="main-button"
        >
          Coba Sekarang
        </button>
      </div>
      <div
        className={`navbar-short-logo ${
          color === "#faf6eb" ? "" : "navbar-head-bg"
        }`}
      >
        <img
          src={
            color === "#404040"
              ? "/logo-short-black.svg"
              : "/logo-short-white.svg"
          }
          alt="logo banana"
        />
      </div>
    </div>
  );
}
