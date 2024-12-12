// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import UserProfile from './components/UserProfile'; // Ensure this is correctly imported
import { BoardContext } from './context/BoardContext';

function App() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My TaskFlow',
        bgcolor: '#069',
        list: [
          { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
          { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
          { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
        ]
      }
    ]
  };

  const [allboard, setAllBoard] = useState(boardData);

  return (
    <Router>
      <Header />
      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className='content flex'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main />} /> {/* Default route */}
            <Route path="/profile" element={<UserProfile />} /> {/* User profile route */}
          </Routes>
        </div>
      </BoardContext.Provider>
    </Router>
  );
}

export default App;
