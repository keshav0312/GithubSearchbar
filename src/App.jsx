/** @format */

import axios from "axios";
import { useState } from "react";


function App() {
  // State for input data and user data
  const [inputData, setInputData] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Function to handle GitHub API request
  function handleSearch() {
    if (inputData) {
      axios
        .get(`https://api.github.com/users/${inputData}`)
        .then((response) => {
          setUserData(response.data);
          setError("");
        })
        .catch(() => {
          setError("User not found!");
          setUserData(null);
        });
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">GitHub User Search</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Input field for GitHub username */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter GitHub username"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Bootstrap card to display user data */}
          {userData && (
            <div className="card">
              <img
                src={userData.avatar_url}
                className="card-img-top w-50 m-auto pt-3"
                alt="User avatar"
              />
              <div className="card-body">
                <h5 className="card-title">{userData.name}</h5>
                <p className="card-text">
                  <strong>Followers:</strong> {userData.followers}
                </p>
                <p className="card-text">
                  <strong>Following:</strong> {userData.following}
                </p>
                <p className="card-text">
                  <strong>Public Repos:</strong> {userData.public_repos}
                </p>
                <a
                  href={userData.html_url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
