export { };

declare global {
  interface EventDate {
    localDate: string;
    dateTime: string;
    noSpecificTime: boolean;
  }

  enum EventStatusCode {
    OnSale = 'onsale',
    OffSale = 'offsale',
    Canceled = 'canceled',
    Postponed = 'postponed',
    Rescheduled = 'rescheduled'
  }

  interface EventStatus {
    codee: EventStatusCode;
  }

  interface EventDates {
    start: EventDate
    end: EventDate
    timezone: string;
    status: EventStatus
  }

  interface EventImage {
    url: string;
    ratio: string;
    width: number;
    height: number;
    fallback: boolean;
    attribution: string;
  }

  interface Event {
    id: string;
    name: string;
    dates: EventDates;
    distance: number;
    info: string;
    pleaseNote: string;
    images: EventImage[]
  }

  interface Embedded {
    events: Event[];
  }

  interface EventResponse {
    _embedded: Embedded
  }
}