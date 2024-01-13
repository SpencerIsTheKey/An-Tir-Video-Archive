import { activityRepo } from '../db/repositories/Activity';
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
    const activities = await activityRepo.getAll();
    const name = 'Archery';
    console.log(activities.filter((activity) => {
        return activity.name == name;
    })); 
}).then(() => {return null});