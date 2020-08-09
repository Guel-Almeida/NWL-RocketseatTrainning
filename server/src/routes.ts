import express from 'express';
import ClassController from './controller/ClassController';
import ConnectionController from './controller/ConnectionController';




const routes = express.Router();
const classController = new ClassController();
const classConnetion = new ConnectionController()

routes.get('/classes', classController.index)
routes.post('/classes', classController.create)
routes.get('/connections', classConnetion.index)
routes.post('/connections', classConnetion.create)

export default routes;