export interface GoogleCalendarInterface {
  fetchEvents(): Promise<GoogleCalendarEventType[]>;
}

export type GoogleCalendarEventType = {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}
