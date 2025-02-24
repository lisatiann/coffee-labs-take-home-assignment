import TableView from './components/TableView';
import { AgentProvider } from './context/AgentContext';
import './App.css';

function App() {
  return (
    <AgentProvider>
      <div className="App">
        <TableView />
      </div>
    </AgentProvider>
  );
}

export default App;
