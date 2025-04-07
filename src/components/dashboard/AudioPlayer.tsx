import { useEffect, useRef } from "react";
import { AudiosInfo } from "../../models/user.model";

const bucketName = import.meta.env.VITE_BUCKET_NAME;

function AudioPlayer({ s3_key }: AudiosInfo) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/public/${s3_key}?v=${Date.now()}`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [s3_key]);

  if (!s3_key || !bucketName) {
    return <p>Error: No se pudo cargar el archivo de audio.</p>;
  }

  return (
    <div>
      <audio key={s3_key} ref={audioRef} controls>
        <source src={audioUrl} type="audio/wav" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

export default AudioPlayer;
