import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [_repositories, _setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      _setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {

    const repository = await api.post('repositories', {
      title: `Desafio Node.js ${Date.now()}`,
      url: "http://github.com/...",
      techs: [
        "Node.js"
      ]
    });

    _setRepositories([..._repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const index = _repositories.findIndex(o => o.id === id);
    if (index > -1) {
      await api.delete(`repositories/${id}`);
      const newList = [..._repositories];
      newList.splice(index, 1);
      _setRepositories(newList);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {_repositories.map(r => {

          return (
            <li key={r.id}>
              {r.title}
              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
          </button>
            </li>
          );
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
