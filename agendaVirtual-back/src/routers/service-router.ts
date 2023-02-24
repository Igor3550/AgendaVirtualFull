import { Router } from 'express';
import serviceController from '../controller/service-controller';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { verifyServiceInput } from '../middlewares/service-insert-middlewares';

const serviceRouter = Router();

serviceRouter
  .get('/', serviceController.getServicesList)
  .use('/', authenticateToken)
  .post('/', verifyServiceInput, serviceController.createService)
  .put('/:id', verifyServiceInput, serviceController.updateService)
  .delete('/:id', serviceController.deleteService);

export { serviceRouter };
