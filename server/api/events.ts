export default defineEventHandler(async (event) => {
  const apikey = process.env.TICKETMASTER_API_KEY;
  const baseURL = process.env.TICKETMASTER_API_URL;
  const queryParams = getQuery(event);

  const query = {
    apikey,
    sort: 'date,asc',
    startDateTime: new Date().toISOString().split('.')[0] + 'Z',
    countryCode: 'AU',
    stateCode: 'VIC',
    ...queryParams
  }

  const response: EventResponse = await $fetch('/events.json', { baseURL, query })
  return { events: response._embedded.events, links: response._links };
})
