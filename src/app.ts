import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import justifyRoutes from './routes/justifyRoutes';
import { setupSwagger } from './swagger';

const app = express();
setupSwagger(app);
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', justifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;