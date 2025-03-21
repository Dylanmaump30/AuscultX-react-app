import { AudiosInfo } from "../../models/user.model";

const bucketName = import.meta.env.VITE_BUCKET_NAME;

function AudioPlayer({ s3_key }: AudiosInfo) {
  if (!s3_key || !bucketName) {
    return <p>Error: No se pudo cargar el archivo de audio.</p>;
  }

  const audioUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/public/${s3_key}`;

  return (
    <div>
      <audio controls>
        <source src={audioUrl} type="audio/wav" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

export default AudioPlayer;
