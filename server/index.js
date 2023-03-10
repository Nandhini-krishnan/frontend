const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
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
})

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id == id);
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

