import 'dotenv/config';
import express from 'express';
import './database/conn';
import routes from './routes/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3030, () => {
    console.log('SERVIDOR RODANDO 🏃')
});