const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const users = [];

app.use(express.json());
app.use(cors());

app.post('/users/', (req, res) => {
  const user = req.body;
  users.push({
    id: (users.length + 1),
    user: user,
    isDeleted: false
  })
  console.log("post");
  res.json(user);
  console.log(users);
})

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  console.log("server find id", id);
  console.log("server find users", users);
  const user = users.find(user => user.id == id);
  console.log("server find user", user);
  const updatedUser = req.body;
  user.user = updatedUser;
  console.log("put");
  res.json(user);
})

app.get('/users/', (req, res) => {
  let activeUser = users.filter(isDeleted);
  console.log("get");
  res.json(activeUser);
})

app.get('/users/:id', (req, res) => {
  console.log("get by id");
  res.json(users.find(user => user.id == req.params.id));
})

function isDeleted(item) {
  return (!item.isDeleted);
}

app.delete('/users/:id', (req, res) => { 
  const id = req.params.id;
  const user = users.find(user => user.id == id);
  user.isDeleted = true;
  console.log("delete");
  res.json({
    message: "User deleted successfully"
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

