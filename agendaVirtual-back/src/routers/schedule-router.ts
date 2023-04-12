import { Router } from 'express';

import scheduleController from '../controller/schedule-controller';
import { adminVerifyToken } from '../middlewares/admin-verify-middleware';
import { verifyScheduleInput } from '../middlewares/schedule-insert-middleware';
import { authenticateToken } from '../middlewares/authentication-middleware';

const scheduleRouter = Router();

scheduleRouter
  .use('/', authenticateToken)
  .get('/client', scheduleController.sendClientScheduleList)
  .post('/client', verifyScheduleInput, scheduleController.createClientSchedule)
  .put('/client/:id', verifyScheduleInput, scheduleController.updateClientSchedule)
  .delete('/client/:id', scheduleController.deleteClientSchedule)
  .use('/', adminVerifyToken)
  .get('/', scheduleController.sendScheduleList)
  .post('/', verifyScheduleInput, scheduleController.createSchedule)
  .put('/:id', verifyScheduleInput, scheduleController.updateSchedule)
  .delete('/:id', scheduleController.deleteSchedule)
  .put('/finish/:id', scheduleController.finishSchedule);

export { scheduleRouter }
