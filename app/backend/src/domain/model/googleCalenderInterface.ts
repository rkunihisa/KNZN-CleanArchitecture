export interface GoogleCalendarInterface {
  fetchEvents(): Promise<GoogleCalendarEvent[]>;
}

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}