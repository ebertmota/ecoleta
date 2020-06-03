import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  console.log('Something here');


  res.json({"message": 'Hello Guys'})
})

app.listen(3333)