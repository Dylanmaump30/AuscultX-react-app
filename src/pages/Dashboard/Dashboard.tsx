import { useState } from "react";
import AudioList from "../../components/dashboard/AudioList";
import ContentResults from "../../components/dashboard/ContentResults";
import MainLayout from "../../components/dashboard/MainLayout";
import { AudiosInfo } from "../../models/user.model";
import Loading from "../../components/loading/Loading";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const [selectedAudio, setSelectedAudio] = useState<AudiosInfo | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSelectAudio = (audio: AudiosInfo) => {
    setSelectedAudio(audio);
    setProcessing(true);
  };
  setTimeout(() => {
    setProcessing(false);
  }, 1000);

  return (
    <MainLayout>
      {parsedUser ? (
        <div className="audio-list-containerdashboard">
          <AudioList _id={parsedUser._id} onSelectAudio={handleSelectAudio} />
          {processing ? (
            <div className="loading-container-results">
              <Loading />
            </div>
          ) : (
            selectedAudio && <ContentResults _id={selectedAudio._id} />
          )}
        </div>
      ) : (
        <p>No se encontró usuario.</p>
      )}
    </MainLayout>
  );
};

export default Dashboard;
