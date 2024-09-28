export function TableHeaderGradingPage() {
  return (
    <thead>
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>ID</th>
        <th>Email</th>
        <th>Grade</th>
        <th>Submission Time</th>
        <th>Week Number</th>
        <th>File submissions</th>
        {/* <th>Graded</th> */}
      </tr>
    </thead>
  );
}
export function TableRowGradingPage({
  record,
  onGradeChange,
  onCommentChange,
}) {
  function timeAgo(inputTime) {
    const now = new Date(); // Current time
    const past = new Date(inputTime); // Input time
    const diffInMs = now - past; // Difference in milliseconds

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} seconds ago`;
    else if (minutes < 60) return `${minutes} minutes ago`;
    else if (hours < 24) return `${hours} hours ago`;
    else if (days < 7) return `${days} days ago`;
    else if (weeks < 4) return `${weeks} weeks ago`;
    else if (months < 12) return `${months} months ago`;
    else return `${years} years ago`;
  }

  return (
    <tr>
      <td>
        <img
          src={record.profilePic}
          alt="Profile"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </td>
      <td>{record.name}</td>
      <td>{record.IDD}</td>
      <td>{record.email}</td>

      <td>{record.Grade["Total"] + "/" + record.Grade["count"] * 10}</td>
      <td>{timeAgo(record.Time)}</td>
      <td>{record.weekNum}</td>

      <td>
        <button onClick={record.openModal} className="GradingViewSumbissionBtn">
          View Submissions
        </button>
      </td>
    </tr>
  );
}
