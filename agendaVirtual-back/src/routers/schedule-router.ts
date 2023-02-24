import { Router } from 'express';

import scheduleController from '../controller/schedule-controller';
import { adminVerifyToken } from '../middlewares/admin-verify-middleware';
import { verifyScheduleInput } from '../middlewares/schedule-insert-middleware';

const scheduleRouter = Router();

scheduleRouter
  .get('/', scheduleController.sendScheduleList)
  .use('/', adminVerifyToken)
  .post('/', verifyScheduleInput, scheduleController.createSchedule)
  .put('/:id', verifyScheduleInput, scheduleController.updateSchedule)
  .delete('/:id', scheduleController.deleteSchedule)
  .put('/finish/:id', scheduleController.finishSchedule);

export { scheduleRouter }
