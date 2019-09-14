// Dev: Guilherme Medeiros Laureano

const express = require('express');

const server = express();

//Determina ao express a utilização do formato Json
server.use(express.json());

let numberOfReq = 0;
const projects = [];

//Middleware global, usado para exibir log
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  return next();
})

// Middleware que verifica se o projeto existe
function checkProjectExists(req, res, next) {
  const {id} = req.params;
  const project = projects.find(p => p.id == id);
  if(!project){
    return res.status(400).json({erros: 'project not found'})
  }
  return next();
}

// Middleware que dá o log no número de requisições
function logRequests(req, res, next) {
  numberOfReq++;
  console.log(`Número de requisições: ${numberOfReq}`);
  return next();
}

server.use(logRequests);

// CRUD
//Criar projeto
server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(project);
});

//Listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Buscar um projeto por seu id
server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  return res.json(project);
});

// Editar projeto
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const {id} =  req.params;
  const {title} = req.body;
  const project = projects.find(p => p.id ==id);
  project.title = title;
  return res.json(project);
});

// Deletar projeto
server.delete('projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  return res.send();
});

//Criar tasks
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(title);
  return res.json(project);
});

server.listen(9000);
