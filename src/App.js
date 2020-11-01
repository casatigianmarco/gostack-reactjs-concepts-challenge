import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: 'Desafio em Node.js',
      url: 'https://github.com/casatigianmarco/gostack-node-concepts-challenge',
      techs: ['Node.js', 'Express']
    }

    const result = await api.post('repositories', newRepo);

    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id} >
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
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
