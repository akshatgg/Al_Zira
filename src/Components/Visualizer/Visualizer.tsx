import React, { useEffect, useRef, useState } from "react";

interface VisualizerProps {
  height?: number; // Maximum height of the bars
  width?: number; // Overall width of the animation
  color?: string; // Color of the bars
  gap?: number; // Space between the bars
  numberOfBars?: number; // Number of bars to display
  barWidth?: number; // Width of each bar
  isListening?: boolean; // Whether the microphone is on
}

const Visualizer: React.FC<VisualizerProps> = ({
  height = 150,
  width = 300,
  color = "#FF5385",
  gap = 8,
  numberOfBars = 16,
  barWidth = 10,
  isListening = true, // Default to true if not provided
}) => {
  const [bars, setBars] = useState<number[]>(new Array(numberOfBars).fill(0)); // Initialize bars to zeros
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Set up the audio context and analyser node only if isListening is true
    const setupAudio = async () => {
      if (!isListening) {
        // If not listening, stop and clean up the microphone access
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        return;
      }

      try {
        // Get microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

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
      // Clean up audio context and microphone access when the component is unmounted or isListening changes
      audioContextRef.current?.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isListening, numberOfBars]);

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
            width: `${barWidth}px`,
            height: isListening
              ? `${(barHeight / 255) * height}px` // Normalized bar height
              : `${barWidth}px`, // Dot height when not listening
            backgroundColor: color,
            borderRadius: isListening
              ? `${barWidth / 2}px` // Round corners for bars
              : "50%", // Make it a circle when not listening
            transition: "height 0.05s ease",
            marginRight: `${index === numberOfBars - 1 ? 0 : gap}px`, // Use gap prop for spacing
          }}
        ></div>
      ))}
    </div>
  );
};

export default Visualizer;
