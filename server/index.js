const express = require('express')
const userRouter = require('./routers/user');
const { PORT } = require('./configs');
const loginRouter = require('./routers/login');
const app = express();
const boardRoutes = require('./routers/board') 
require('./DB/connectDB');



const port = PORT;
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());


app.use('/api/board',boardRoutes);

app.use('/api', userRouter);

app.use('/api', loginRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
