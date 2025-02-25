import TableView from './components/TableView';
import { AgentProvider } from './context/AgentContext';
import { AlertProvider } from './context/AlertContext';
import './App.css';

function App() {
  return (
    <AlertProvider>
      <AgentProvider>
        <div className="App">
          <TableView />
        </div>
      </AgentProvider>
    </AlertProvider>
  );
}

export default App;
