import Link from "next/link";
import { FunctionComponent } from "react";
import styles from "@/styles/events/EventListCard.module.scss";

type Props = {
  id:number,
  eventName: string,
  host: string,
  startDate: Date,
  endDate: Date,
  activities: Array<{id: number, name: string}>,
  videoCount: number
};


const EventListCard: FunctionComponent<Props> = ({
  id,
  eventName,
  host,
  startDate,
  endDate,
  activities,
  videoCount
}) => {
    return (
      <Link href = {`/event/${id}`} className={styles.card_wrapper}>
        <div className={styles.card_left}>
          <div>
            <h1>{eventName}</h1>
            <h2>{host}</h2>
          </div>
          <h3>{startDate.toString()} - {endDate.toString()}</h3>
        </div>
        <div className={styles.card_right}>
          <div className={styles.activity_wrapper}>
            <div className={styles.activity_toggle}>
              Activities
              {/*Arrow here. Down if inactive, up if active*/}
            </div>
            <div className={styles.activity_list}>
              {activities.map((activity) => (
                <Link className={styles.activity_item} href={`/activities/${activity.name}`}>
                  {activity.name}
                </Link>
              ))}
            </div>
          </div>
          {videoCount} videos
        </div>
      </Link>
    );
}

export default EventListCard;