const express = require('express');

const server = express();

//Determina ao express a utilização do formato Json
server.use(express.json());

const projects = [];

// Função que verifica se os parametros estão sendo passados
function checkProjectExist(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({error: 'id name is required'});
  }
  if (!req.body.title) {
    return res.status(400).json({error: 'title name is required'});
  }
  // if(!req.body.task){
  //   return res.status(400).json({error: 'task name is required'});
  // }
  return next();
}

function checkProjectInArry(req, res, next) {
  const project = projects[req.params.id];
  if (!project) {
    return res.status(400).json({error: 'Project does not exists'});
  }
  req.project = project;
  return next();
}

// CRUD
//Criar projeto
server.post('/projects', checkProjectExist, (req, res) => {
  const {id, title} = req.body;
  projects.push({id, title});
  return res.json(projects);
});

//Listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Buscar um projeto por seu id
server.get('/projects/:id', checkProjectInArry, (req, res) => {
  return res.json(req.project);
});

// Editar projeto
server.put('/projects/:id', checkProjectInArry, (req, res) => {
  const {id} =  req.params;
  const {title} = req.body;
  projects.id = title;
  return res.json(projects);
});

// Deletar projeto
server.delete('projects/:id', checkProjectInArry, (req, res) => {
  return
});

//Criar tasks
server.post('/projects/:id/tasks', checkProjectInArry, (req, res) => {
  return
});

server.listen(9000);
