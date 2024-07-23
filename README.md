# Tickettrek

A web application utilising the [Ticketmaster API](https://developer.ticketmaster.com/api-explorer/) to search for and view events.

This application is deployed at [https://tickettrek.vercel.app/](https://tickettrek.vercel.app/).

## Setup

Create a .env file and add the following variables:

```
TICKETMASTER_API_KEY=<YOUR_API_KEY>
TICKETMASTER_API_URL=https://app.ticketmaster.com/discovery/v2
```

Where your API key can be obtained from [Ticketmaster](https://developer.ticketmaster.com/).

To run locally:

```bash
npm install
npm run dev
```

Then open your browser at `http://localhost:3000`.

To build the application for production:

```bash
npm run build
```

To build a local production preview:

```bash
npm run preview
```

To run tests:

```bash
npm run test
```

## More Info

This applicatino was built with [Nuxt 3](https://nuxt.com/docs/getting-started/introduction).

This project uses the [tailwindcss](https://tailwindcss.com/) framework.

### Potential Improvements

- Rate limiting
- Search by text
- Link to event detail
- Improved error handling
