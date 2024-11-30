import React, { useRef, useEffect } from "react";

interface VisualizerProps {
  color?: string; // Color of the waveform
  width?: number; // Width of the canvas
  height?: number; // Height of the canvas
  barWidth?: number; // Line width of the waveform
}

const Visualizer: React.FC<VisualizerProps> = ({
  color = "lime",
  width = window.innerWidth,
  height = window.innerHeight,
  barWidth = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    const setupAudioContext = async () => {
      // Access the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create an audio source and analyser node
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048; // Higher value for smoother waveforms
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      // Start visualizing
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const draw = () => {
        animationFrameId = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        // Clear canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw waveform
        ctx.lineWidth = barWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      };

      draw();
    };

    setupAudioContext().catch(console.error);

    return () => {
      // Clean up resources
      cancelAnimationFrame(animationFrameId);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [color, barWidth]); // Add dependencies

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: "block", background: "black" }}
    />
  );
};

export default Visualizer;
