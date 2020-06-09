import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import { checkBody } from './validators/pointValidator';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();


routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  checkBody,
  pointsController.create,
);


export default routes;
