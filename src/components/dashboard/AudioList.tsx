import { useEffect, useState } from "react";
import { getAudios } from "../../services/audioService";
import { AudioListProps, AudiosInfo } from "../../models/user.model";
import Loading from "../loading/Loading";
import DownloadButton from "../button/DownloadButton";
export interface AudioListExtendedProps extends AudioListProps {
  onSelectAudio: (audio: AudiosInfo) => void;
}

const AudioList = ({ _id, onSelectAudio }: AudioListExtendedProps) => {
  const [audios, setAudios] = useState<AudiosInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<string>("");

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        setLoading(true);
        const data = await getAudios(_id);
        setAudios(data);
        if (data.length === 0) {
          setError("No tienes audios guardados.");
        } else {
          setError(null);
        }
      } catch (error) {
        console.error("Error al cargar los audios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, [_id]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedAudio(selectedId);
    const selectedAudioObj = audios.find((audio) => audio._id === selectedId);
    if (selectedAudioObj) {
      onSelectAudio(selectedAudioObj);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : audios.length > 0 ? (
        <div className="audio-list-container">
          <select
            value={selectedAudio}
            onChange={handleSelectChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="" disabled className="text-gray-400">
              Selecciona un audio
            </option>
            {audios.map((audio) => (
              <option key={audio._id} value={audio._id}>
                {audio.audio_filename}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="no-users-container">
          <h3 className="no-users-text">
            No tienes audios guardados. <br />
            Descarga la app y escucha tu respiración
          </h3>

          <DownloadButton
            fileName="/images/LungTrack.apk"
            className="no-users-button"
          />
        </div>
      )}
    </div>
  );
};
export default AudioList;
