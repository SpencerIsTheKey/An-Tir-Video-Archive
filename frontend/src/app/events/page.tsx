import EventListCard from "@/components/events/EventListCard";
import SearchBar from "@/components/events/SearchBar";
import Filters from "@/components/events/Filters";
import { AllEvents } from "@/fetch/events.all";
import styles from '@/styles/events/EventPage.module.scss';

async function events() {
  const event_data = await AllEvents();
  return (
    <>
      <SearchBar />
      <div className={styles.sidebar_layout}>
        <Filters className={styles.sidebar}/>
        <div>
        {
        event_data.map((scaEvent, idx) => (
          <EventListCard {...scaEvent} />
          ))
        } 
        </div>
      </div>
      
      {event_data}
    </>
  )
}

export default events;