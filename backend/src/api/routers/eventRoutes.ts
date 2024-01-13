import { Router } from 'express';
import { activitiesAtEvent, event, events, pageOfEvents } from '../controllers/eventController';

export const eventRouter = Router();

eventRouter.route('/all').get(events);
eventRouter.route('/page/:page').get(pageOfEvents);
eventRouter.route('/:event').get(event);
eventRouter.route('/:event/activities').get(activitiesAtEvent);
// eventRouter.route('/:event/videos').get(videos);
// eventRouter.route('/:event/new-video').post(addVideo);
