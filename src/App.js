import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // 1st shoot
  async function handleAddRepository() {
    const response = await api
      .post("repositories", {
        title: `react in ${Date.now()}`,
        url: "https://github.com/micaelgoms/Agente12",
        techs: ["node", "react", "CSS"],
      })
      .catch((reject) => console.error(reject));

    const newRepo = response.data;
    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api
      .delete("repositories/" + id.toString())
      .then((response) => console.log(response))
      .catch((reject) => console.error(reject));

    let indexRepo = repositories.findIndex((repo) => repo.id === id);
    if (indexRepo < 0) return alert("No repository founded!");

    const tmpRepositories = [...repositories];
    tmpRepositories.splice(indexRepo, 1);
    setRepositories(tmpRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
