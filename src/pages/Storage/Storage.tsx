import { useState } from "react";
import AudioList from "../../components/dashboard/AudioList";
import MainLayout from "../../components/dashboard/MainLayout";
import Loading from "../../components/loading/Loading";
import { AudiosInfo } from "../../models/user.model";
import AudioPlayer from "../../components/dashboard/AudioPlayer";
const Storage = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const [selectedAudio, setSelectedAudio] = useState<AudiosInfo | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSelectAudio = (audio: AudiosInfo) => {
    setSelectedAudio(audio);
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
    }, 1000);
  };

  return (
    <MainLayout>
      {parsedUser ? (
        <div>
          <AudioList _id={parsedUser._id} onSelectAudio={handleSelectAudio} />
          {processing ? (
            <div className="loading-container-results">
              <Loading />
            </div>
          ) : (
            selectedAudio &&
            selectedAudio.s3_key && (
              <div className="audio-player-container mt-4 flex flex-col items-center position-relative top-40">
                <AudioPlayer
                  _id={parsedUser._id}
                  s3_key={selectedAudio.s3_key}
                />
              </div>
            )
          )}
        </div>
      ) : (
        <p>No se encontró usuario.</p>
      )}
    </MainLayout>
  );
};

export default Storage;
