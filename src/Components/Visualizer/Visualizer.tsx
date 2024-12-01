import React, { useEffect, useRef, useState } from "react";

interface VisualizerProps {
  height?: number; // Maximum height of the bars
  width?: number; // Overall width of the animation
  color?: string; // Color of the bars
  gap?: number; // Space between the bars
  numberOfBars?: number; // Number of bars to display
  barWidth?: number; // Width of each bar
}

const Visualizer: React.FC<VisualizerProps> = ({
  height = 150,
  width = 300,
  color = "#FF5385",

  gap = 8, // Default gap between bars
  numberOfBars = 16, // Default number of bars
  barWidth = 10, // Default width of each bar
}) => {
  const [bars, setBars] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    // Set up the audio context and analyser node
    const setupAudio = async () => {
      try {
        // Get microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        // Adjust fftSize based on the desired number of bars
        const fftSize = Math.pow(2, Math.ceil(Math.log2(numberOfBars * 2))); // Nearest power of 2
        analyser.fftSize = fftSize;
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        source.connect(analyser);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    setupAudio();

    return () => {
      // Clean up audio context when the component is unmounted
      audioContextRef.current?.close();
    };
  }, [numberOfBars]);

  useEffect(() => {
    const updateBars = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        setBars([...dataArrayRef.current]);
      }
    };

    const interval = setInterval(updateBars, 50); // Update every 50ms
    return () => clearInterval(interval);
  }, []);

  const containerWidth = (numberOfBars * barWidth) + ((numberOfBars - 1) * gap); // Calculate container width

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: `${Math.min(containerWidth, width)}px`, // Constrain to the specified width
        height: `${height}px`,
        overflow: "hidden", // Ensure it fits within the container
      }}
    >
      {bars.slice(0, numberOfBars).map((barHeight, index) => (
        <div
          key={index}
          style={{
            width: `${barWidth}px`, // Use the barWidth prop
            height: `${(barHeight / 255) * height}px`, // Normalize bar height
            backgroundColor: color,
            borderRadius: `${barWidth / 2}px`, // Make corners fully rounded (half of barWidth)
            transition: "height 0.05s ease",
            marginRight: `${index === numberOfBars - 1 ? 0 : gap}px`, // Use gap prop for spacing
          }}
        ></div>
      ))}
    </div>
  );
};

export default Visualizer;
