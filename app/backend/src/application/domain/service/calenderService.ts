import { CalenderPort } from "../../port/in/api/calenderPort";

export class CalenderService {
  private calendar: CalenderPort;

  constructor(calendar: CalenderPort) {
    this.calendar = calendar;
  }

  async createEventList(): Promise<string[]> {
    const events = await this.calendar.fetchEvents();
    const eventList = events.map(event => {
      return `${event.start.dateTime} - ${event.end.dateTime}: ${event.summary}`;
    });
    return eventList;
  }
}
