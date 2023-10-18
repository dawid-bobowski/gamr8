import express from 'express';
import cors from 'cors';

import loginRoutes from './routes/login';
import userRoutes from './routes/user';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use(loginRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
