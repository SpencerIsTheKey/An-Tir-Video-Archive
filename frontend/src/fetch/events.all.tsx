import { cache } from 'react';

export const AllEvents = cache( async () => {
  const eventsResponse = await fetch(`${process.env.API_URL}/events/all`);
  return await eventsResponse.json();
})