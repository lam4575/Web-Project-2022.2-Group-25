const express = require('express')
const userRouter = require('./routers/user');
const connectToDB = require('./DB/connectDB');
const { PORT } = require('./configs');
const app = express();



const port = PORT;
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
