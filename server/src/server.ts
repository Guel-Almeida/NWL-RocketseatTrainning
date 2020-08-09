import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors())
app.use(express.json()); //por padrao o express nao entende json entao essa funcao vai fazela entender 
app.use(routes);

app.listen(3333);