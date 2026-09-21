import { useEffect, useState } from "react";
import api from "../services/api";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [issuesRes, booksRes, membersRes] = await Promise.all([
        api.get("/issues"),
        api.get("/books"),
        api.get("/members"),
      ]);

      setIssues(issuesRes.data);
      setBooks(booksRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load issue data");
    }
  };

  const issueBook = async (e) => {
    e.preventDefault();

    if (!bookId || !memberId) {
      alert("Please select book and member");
      return;
    }

    try {
      await api.post(`/issues/book/${bookId}/member/${memberId}`);

      alert("Book issued successfully");

      setBookId("");
      setMemberId("");

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to issue book");
    }
  };

  const returnBook = async (issueId) => {
    if (!window.confirm("Return this book?")) return;

    try {
      await api.put(`/issues/return/${issueId}`);

      alert("Book returned successfully");

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to return book");
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Issues</h1>
          <p>Issue and return books</p>
        </div>
      </div>

      <div className="issue-form">
        <h2>Issue Book</h2>

        <form onSubmit={issueBook} className="issue-fields">
          <div>
            <label>Select Book</label>

            <select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            >
              <option value="">Select a book</option>

              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} - {book.author}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Member</label>

            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            >
              <option value="">Select a member</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.email}
                </option>
              ))}
            </select>
          </div>

          <button className="btn primary issue-btn" type="submit">
            Issue Book
          </button>
        </form>
      </div>

      <div className="table-card issues-table">
        <div className="table-header">
          <h2>Issue History</h2>
          <span>{issues.length} issues</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book</th>
                <th>Member</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {issues.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty">
                    No issues found
                  </td>
                </tr>
              ) : (
                issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>

                    <td>
                      {issue.book?.title || "Unknown Book"}
                    </td>

                    <td>
                      {issue.member?.name || "Unknown Member"}
                    </td>

                    <td>{issue.issueDate || "-"}</td>

                    <td>{issue.returnDate || "-"}</td>

                    <td>
                      <span
                        className={
                          issue.status === "ISSUED"
                            ? "status issued"
                            : "status returned"
                        }
                      >
                        {issue.status}
                      </span>
                    </td>

                    <td>
                      {issue.status === "ISSUED" ? (
                        <button
                          className="action return"
                          onClick={() => returnBook(issue.id)}
                        >
                          Return
                        </button>
                      ) : (
                        <span className="returned-text">
                          Returned ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Issues;
