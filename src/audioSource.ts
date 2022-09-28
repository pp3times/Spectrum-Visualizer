import { createSignal } from "solid-js";

const [rawData, setRawData] = createSignal<number[]>([]);

export const startFromFile = async () => {
  const res = await fetch("/evolution.mp3");
  const byteArray = await res.arrayBuffer();

  const context = new AudioContext();

  const audioBuffer = await context.decodeAudioData(byteArray);

  const source = context.createBufferSource();
  source.buffer = audioBuffer;

  const analyzer = context.createAnalyser();
  analyzer.fftSize = 512;

  source.connect(context.destination);
  // analyzer.connect(context.destination);
  source.start();

  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const update = () => {
    analyzer.getByteFrequencyData(dataArray);
		setRawData(Array.from(dataArray));
    // console.log(Array.from(dataArray));
		requestAnimationFrame(update);
  };
	requestAnimationFrame(update);
};

export { rawData };
