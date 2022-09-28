import type { Component } from 'solid-js';
import { rawData, startFromFile } from './audiosource';

startFromFile();
const App: Component = () => {
  return (
    <div onClick={startFromFile} style="width: 100vw; height: 100vh;">
			{JSON.stringify(rawData())}
    </div>
  );
};

export default App;
