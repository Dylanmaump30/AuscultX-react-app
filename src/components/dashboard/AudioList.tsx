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
  const [selectedDate, setSelectedDate] = useState<string>("");
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
  const extractDate = (filename: string) => filename.split("_")[0];
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = event.target.value.replace(/-/g, "");
    setSelectedDate(formattedDate);
    setSelectedAudio("");
  };

  const filteredAudios = audios.filter(
    (audio) =>
      selectedDate === "" ||
      extractDate(audio.audio_filename ?? "") === selectedDate
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedAudio(selectedId);
    const selectedAudioObj = filteredAudios.find(
      (audio) => audio._id === selectedId
    );
    if (selectedAudioObj) {
      onSelectAudio(selectedAudioObj);
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="audio-list-container">
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : error ? (
        <p className="text-red-500 font-bold">{error}</p>
      ) : audios.length > 0 ? (
        <div className="audio-list flex flex-col items-center w-full">
          <input
            type="date"
            max={today}
            value={
              selectedDate
                ? selectedDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
                : ""
            }
            onChange={handleDateChange}
            className="select-date"
          />

          {selectedDate && (
            <select
              value={selectedAudio}
              onChange={handleSelectChange}
              className="select-audio mt-4"
            >
              <option value="" disabled>
                Select an audio
              </option>
              {filteredAudios.length > 0 ? (
                filteredAudios.map((audio) => (
                  <option key={audio._id} value={audio._id}>
                    {audio.audio_filename}
                  </option>
                ))
              ) : (
                <option disabled>No audios available for this date.</option>
              )}
            </select>
          )}

          {!selectedDate && (
            <div>
              <h3 className="select-text text-black text-3xl mt-4 font-righteous text-center">
                Select a date and examine your lungs!
              </h3>
              <img
                className="exam-img flex flex-col items-center w-full"
                src="/exam.png"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="no-users-container">
          <h3 className="no-users-text">
            You have no saved audios. <br />
            Download the app and listen to your lungs.
          </h3>

          <DownloadButton
            fileName="/AuscultX.apk"
            className="no-users-button"
          />
        </div>
      )}
    </div>
  );
};
export default AudioList;
