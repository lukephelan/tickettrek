export default defineEventHandler(async (_event) => {
  const apikey = process.env.TICKETMASTER_API_KEY;
  const baseURL = process.env.TICKETMASTER_API_URL;

  const query = {
    apikey,
    size: '10',
    page: '1'
  }

  try {
    const response: EventResponse = await $fetch('/events.json', { baseURL, query })
    return response._embedded.events;
  } catch (e) {
    console.error(e)
    return [];
  }
})
