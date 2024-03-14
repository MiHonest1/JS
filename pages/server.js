const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/register', (req, res) => {
  const newUser = req.body;
  
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    
    const users = JSON.parse(data);
    newUser.id = users.length + 1;
    users.push(newUser);
    
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
        return;
      }
      
      res.status(200).send('Пользователь успешно зарегистрирован');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
