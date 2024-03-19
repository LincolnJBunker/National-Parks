import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import handlerFunctions from './controller.js';


const app = express();
const port = '9001';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())















ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));