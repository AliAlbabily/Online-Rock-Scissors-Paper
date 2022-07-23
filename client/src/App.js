
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from './components/ProfileForm';
import PlayersWaitingPage from './components/PlayersWaitingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProfileForm />} />
          <Route path="/waitingroom" element={<PlayersWaitingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
