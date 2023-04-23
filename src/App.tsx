import { useState } from 'react';
import hedgeappLogo from './assets/tree.png';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <img src={hedgeappLogo} className="logo" alt="Hedgheapp logo" />
      </div>
      <h1>HedgeApp</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
};

export default App;
