import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { AudiosInfo } from "../../models/user.model";

const bucketName = import.meta.env.VITE_BUCKET_NAME;

function AudioPlayer({ s3_key }: AudiosInfo) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const audioUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/public/${s3_key}?v=${Date.now()}`;

  useEffect(() => {
    if (!audioRef.current || !waveformRef.current) return;

    // Limpia instancia anterior
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#A0AEC0",
      progressColor: "#3182CE",
      barWidth: 2,
      height: 100,
      // responsive: true, // ⚠️ Esto puede mostrar warning, pero funciona con TypeScript ignorado
      media: audioRef.current, // Clave: usar el elemento <audio>
    });

    wavesurfer.load(audioUrl); // Sincroniza con el <audio>
    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  if (!s3_key || !bucketName) {
    return <p>Error: No se pudo cargar el archivo de audio.</p>;
  }

  return (
    <div className="audio-player-container mt-6 flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Reproductor de Audio
      </h1>
      <p className="text-gray-600 mb-4"> Escucha tu respiración.</p>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center space-y-4">
        <div ref={waveformRef} className="w-full" />
        <audio ref={audioRef} controls className="w-full accent-blue-600">
          <source src={audioUrl} type="audio/wav" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  );
}

export default AudioPlayer;
