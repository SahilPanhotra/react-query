import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels,status }) {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelsString}${statusString}`).then((response) =>
      response.json()
    );
  });
  return (
    <div>
      <h1>Issues List</h1>
      {issuesQuery.isLoading ? (
        <p>loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
