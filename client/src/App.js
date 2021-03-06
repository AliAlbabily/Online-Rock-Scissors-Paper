
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from './components/ProfileForm';
import PlayersWaitingPage from './components/PlayersWaitingPage';
import {SocketContext, socket} from './context/socket';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}> {/* for the use of exporting socket io to all components*/}
        <Router>
          <Routes>
              <Route path="/" element={<ProfileForm />} />
              <Route path="/waitingroom" element={<PlayersWaitingPage />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
      
    </div>
  );
}

export default App;
