import React, { useState, useEffect } from "react";

const HealthIssuesForm = ({ onHealthIssueSelected }) => {
  const healthIssues = [
    "Diabetes",
    "Ulcer",
    "Heart Diseases",
    "Asthma",
    "Stroke",
    "None",
  ];

  const [selectedIssue, setSelectedIssue] = useState("");

  const handleIssueSelect = (issueName) => {
    const newSelectedIssue = issueName === selectedIssue ? "" : issueName;
    setSelectedIssue(newSelectedIssue);
    onHealthIssueSelected(newSelectedIssue !== ""); 
  };

  useEffect(() => {
    localStorage.setItem("selectedHealthIssue", JSON.stringify(selectedIssue));
  }, [selectedIssue]);

  return (
    <div className="min-h-screen w-screen px-4 flex flex-col justify-center items-center">
      <h2 className="mb-4 mt-10 text-2xl font-bold text-left w-full lg:text-center">
        Any existing Health Condition?
      </h2>
      <div className="flex flex-col gap-4 mb-10 w-full max-w-md mx-auto">
        {healthIssues.map((issue) => (
          <label
            key={issue}
            className={`flex items-center border border-gray-100 rounded-md p-3 lg:p-5 ${
              issue === selectedIssue ? "bg-blue-200" : ""
            }`}
          >
            <input
              type="radio"
              onChange={() => handleIssueSelect(issue)}
              checked={issue === selectedIssue}
              className="custom-radio-btn mr-4"
            />
            <span className="font-bold">{issue}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HealthIssuesForm;