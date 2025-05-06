import DownloadButton from "../../../components/button/DownloadButton";
import "../../../styles/hero.css";
function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>BREATHE WELL, LIVE WELL</h1>
        <p>Get your checkup now!</p>
      </div>
      <DownloadButton fileName="/AuscultX.apk" className="download-button">
        {" "}
        Download APK
      </DownloadButton>
    </div>
  );
}
export default Hero;
