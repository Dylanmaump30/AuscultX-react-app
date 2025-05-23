import { useEffect } from "react";
import Plot from "react-plotly.js";
import { motion } from "framer-motion";

interface GraphProps {
  id: string;
  collapsed?: boolean;
  x: number[];
  y: number[];
  titley: string;
  title: string;
  linecolor: string;
}

export default function Graph({
  id,
  collapsed,
  x,
  y,
  titley,
  title,
  linecolor,
}: GraphProps) {
  const plotId = `plotlyChart-${id}`; // Se genera un ID único

  useEffect(() => {
    setTimeout(() => {
      const plotElement = document.getElementById(plotId);
      if (plotElement) {
        (window as any).Plotly.relayout(plotElement, {
          autosize: true,
        });
      }
    }, 400);
  }, [collapsed, plotId]);

  return (
    <motion.div
      animate={{
        width: collapsed ? "100%" : "100%",
        height: collapsed ? "100%" : "100%",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Plot
        divId={plotId} // Se asigna el ID único
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "lines",
            line: { color: linecolor },
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 45, l: 45, r: 45, b: 45 },
          xaxis: {
            showgrid: true,
            title: "tiempo (s)",
            autorange: true,
          },
          yaxis: {
            title: titley,
            autorange: true,
          },
          title: {
            text: title,
            font: {
              family: "Roboto Condensed",
              size: 23,
              color: "black",
            },
          },
        }}
        config={{ responsive: true, displayModeBar: false }}
        className="ploty-graphs"
        style={{ width: "100%", height: "100%", display: "flex" }}
      />
    </motion.div>
  );
}
