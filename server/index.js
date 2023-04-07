const express = require('express')
const userRouter = require('./routers/user');
const connectToDB = require('../BE/DB/connectDB')
const app = express();



const port = 3030;
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
