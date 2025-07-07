import { GoogleCalendarInterface } from "../model/googleCalenderInterface";

export class GoogleCalendarService {
  private googleCalendar: GoogleCalendarInterface;

  constructor (googleCalendar: GoogleCalendarInterface) {
    this.googleCalendar = googleCalendar;
  }

  async fetch() {
    const events = await this.googleCalendar.fetchEvents();
    return events;
  }
}
