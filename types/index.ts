export { };

declare global {
  interface EventResponse {
    _embedded: Embedded,
    _links: Links
  }

  interface Embedded {
    events: Event[];
  }

  interface Event {
    id: string;
    name: string;
    dates: EventDates;
    images: EventImage[];
    place: EventPlace;
    _embedded: EventEmbedded;
  }

  interface EventDates {
    start: EventDate
    end: EventDate
    timezone: string;
    status: EventStatus
  }

  interface EventDate {
    localDate: string;
    dateTime: string;
    noSpecificTime: boolean;
  }

  interface EventStatus {
    codee: EventStatusCode;
  }

  enum EventStatusCode {
    OnSale = 'onsale',
    OffSale = 'offsale',
    Canceled = 'canceled',
    Postponed = 'postponed',
    Rescheduled = 'rescheduled'
  }

  interface EventImage {
    url: string;
    ratio: string;
    width: number;
    height: number;
    fallback: boolean;
    attribution: string;
  }

  interface EventPlace {
    name: string;
  }

  interface EventEmbedded {
    venues: Venue[];
  }

  interface Venue {
    name: string;
  }

  interface Links {
    first: Link;
    prev: Link;
    self: Link;
    next: Link;
    last: Link;
  }

  interface Link {
    href: string;
    templated: boolean;
  }
  
  interface ReturnObject {
    events: Event[];
    links: Links
  }
}