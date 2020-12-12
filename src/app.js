const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title = null, url = null, techs = null } = request.body;

  if (!title || !url || !techs) {
    return response.status(400).json({ error: "bad request" });
  }

  const respository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(respository);

  return response.status(201).json(respository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title = null, url = null, techs = null } = request.body;
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "not is ID validate" });
  }

  // if (!title && !url && !techs) {
  //   return response.status(400).json({ error: "bad request" });
  // }

  const respositoryIndex = repositories.findIndex((r) => r.id === id);
  if (respositoryIndex < 0) {
    return response.status(404).json({ error: "respository not found" });
  }

  const respository = {
    id,
    title: title ? title : repositories[respositoryIndex].title,
    url: url ? url : repositories[respositoryIndex].url,
    techs: techs ? techs : repositories[respositoryIndex].techs,
    likes: repositories[respositoryIndex].likes,
  };

  repositories[respositoryIndex] = respository;

  return response.status(200).json(respository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "not is ID validate" });
  }

  const respositoryIndex = repositories.findIndex((r) => r.id === id);
  if (respositoryIndex < 0) {
    return response.status(404).json({ error: "respository not found" });
  }

  repositories.splice(respositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "not is ID validate" });
  }

  const respositoryIndex = repositories.findIndex((r) => r.id === id);
  if (respositoryIndex < 0) {
    return response.status(404).json({ error: "respository not found" });
  }

  const respository = repositories[respositoryIndex];

  repositories[respositoryIndex] = {
    ...respository,
    likes: respository.likes + 1,
  };

  return response.status(201).json(repositories[respositoryIndex]);
});

module.exports = app;
