import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Issues from "./pages/Issues";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <h2>📚 Library</h2>

          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/books">📖 Books</Link>
            <Link to="/members">👥 Members</Link>
            <Link to="/issues">🔄 Issues</Link>
          </nav>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/issues" element={<Issues />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
