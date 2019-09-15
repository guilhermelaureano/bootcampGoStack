const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Guilherme", "email": "guilhermeml001@gmail.com" }

//CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Guilherme', 'Felipe', 'Robson'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

function checkUserExist(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: 'User name is required'});
  }

  return next();
}

function checkUserInArry (req, res, next){
  const user = users[req.params.index];

  if(!user){
    return res.status(400).json({error: 'User does not exists'});
  }

  req.user = user;

  return next();
}

//Listar Todos
server.get('/users', (req, res) => {
  return res.json(users);
});

//Buscar usuário pelo id
server.get('/users/:index', checkUserInArry, (req, res) => {
  return res.json(req.user);
});

//Criar usuário
server.post('/users', checkUserExist, (req, res) => {
  const {name} = req.body;
  users.push(name);
  
  return res.json(users);
});

//Editar usuário
server.put('/users/:index', checkUserExist, checkUserInArry, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;
  return res.json(users);
});

//Deletar usuário
server.delete('/users/:index', checkUserInArry, (req, res) => {
  const {index} = req.params;
  users.splice(index, 1);
  return res.send();
})

server.listen(3333);
