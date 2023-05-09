const express = require('express')
const fileUpload = require('express-fileupload');
const userRouter = require('./routers/user');
const { PORT } = require('./configs');
const loginRouter = require('./routers/login');
const app = express();
const boardRoutes = require('./routers/board');
const listRoutes = require('./routers/list');
const testRouter = require('./routers/test');

require('./DB/connectDB');



const port = PORT;
app.use(
  express.urlencoded({ extended: true })
);

app.use(fileUpload());
  
app.use(express.json());

app.use('/api', listRoutes);

app.use('/api/boards',boardRoutes);

app.use('/api', userRouter);

app.use('/api', loginRouter);


//For testing routes
app.use('/api', testRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
