import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [booksRes, membersRes, issuesRes] = await Promise.all([
        api.get("/books"),
        api.get("/members"),
        api.get("/issues"),
      ]);

      setBooks(booksRes.data);
      setMembers(membersRes.data);
      setIssues(issuesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const issuedCount = issues.filter(
    (issue) => issue.status === "ISSUED"
  ).length;

  return (
    <div>
      <div className="topbar">
        <h1>Dashboard</h1>
        <p>Library Management System</p>
      </div>

      <div className="cards">
        <div className="card blue">
          <span>📚</span>
          <div>
            <h3>{books.length}</h3>
            <p>Total Books</p>
          </div>
        </div>

        <div className="card green">
          <span>👥</span>
          <div>
            <h3>{members.length}</h3>
            <p>Total Members</p>
          </div>
        </div>

        <div className="card orange">
          <span>📤</span>
          <div>
            <h3>{issuedCount}</h3>
            <p>Issued Books</p>
          </div>
        </div>

        <div className="card purple">
          <span>🔄</span>
          <div>
            <h3>{issues.length}</h3>
            <p>Total Issues</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
