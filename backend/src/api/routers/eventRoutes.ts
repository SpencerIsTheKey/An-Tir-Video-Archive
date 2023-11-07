import { Router } from 'express';
import { getAll } from '../services/eventService';

export const eventRouter = Router();

eventRouter.route('/all').get(getAll);