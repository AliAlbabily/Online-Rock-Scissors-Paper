
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from './components/ProfileFormPage';
import PlayersWaitingPage from './components/PlayersWaitingPage';
import GamePage from "./components/GamePage";
import {SocketContext, socket} from './context/socket';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}> {/* for the use of exporting socket io to all components*/}
        <Router basename="/Online-Rock-Scissors-Paper">
          <Routes>
              <Route path="/" element={<ProfileForm />} />
              <Route path="/waitingroom" element={<PlayersWaitingPage />} />
              <Route path="/gamepage" element={<GamePage />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
      
    </div>
  );
}

export default App;
