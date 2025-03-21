import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import Graph from "./Graph";
import "../../styles/content.css";
import { getAudioData } from "../../services/audioService";
import Loading from "../loading/Loading";
import { AudioData, AudiosInfo } from "../../models/user.model";

const ContentResults = ({ _id }: AudiosInfo) => {
  const context = useContext(MyContext);
  const collapsed = context?.isToggleSidebar;
  const [audioData, setAudioData] = useState<AudioData | null>(null);

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const data = await getAudioData({
          _id: _id,
        });
        setAudioData(data);
      } catch (error) {
        console.error("Error al cargar los datos del audio:", error);
      }
    };

    fetchAudioData();
  }, [_id]);

  if (!audioData) {
    return <Loading />;
  }
  const { time, original_signal, filtered_signal, envelope_signal, rpm } =
    audioData;

  return (
    <div className="right-content w-100">
      <div className="all-content row dashboardBoxWrapperRow">
        <div className="graphscontainer col-md-11">
          <div className="dashboardBoxWrapper">
            <div className="dashboardBox">
              <Graph
                id="grafico1"
                collapsed={collapsed}
                x={time}
                y={original_signal}
                titley="Amplitud"
                title="Señal Original"
                linecolor="blue"
              />
            </div>

            <div className="dashboardBox">
              <Graph
                id="grafico2"
                collapsed={collapsed}
                x={time}
                y={filtered_signal}
                titley="Amplitud"
                title="Señal Filtrada"
                linecolor="green"
              />
            </div>

            <div className="dashboardBox">
              <Graph
                id="grafico3"
                collapsed={collapsed}
                x={time}
                y={envelope_signal}
                titley="Amplitud"
                title="Señal Envolvente"
                linecolor="red"
              />
            </div>

            {/* Gráfico 4: RPM */}
            <div className="rpm-box">
              <h3 className="rpm-title">Frecuencia respiratoria</h3>
              <div
                className={`rpm-value ${
                  rpm >= 12 && rpm <= 20 ? "rpm-normal" : "rpm-alert"
                }`}
              >
                {Math.round(rpm)} RPM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentResults;
