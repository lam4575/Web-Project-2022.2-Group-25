const express = require('express')
const userRouter = require('./routers/user');
const { PORT } = require('./configs');
const loginRouter = require('./routers/login');
const app = express();
require('./DB/connectDB');



const port = PORT;
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);

app.use('/api', loginRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
