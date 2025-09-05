import { GoogleCalenderInterface } from "../model/googleCalenderInterface";

export class GoogleCalenderService {
  private googleCalendar: GoogleCalenderInterface;

  constructor(googleCalendar: GoogleCalenderInterface) {
    this.googleCalendar = googleCalendar;
  }

  async createEventList(): Promise<string[]> {
    const events = await this.googleCalendar.fetchEvents();
    const eventList = events.map(event => {
      return `${event.start.dateTime} - ${event.end.dateTime}: ${event.summary}`;
    });
    return eventList;
  }
}
