import { injectable, inject } from "tsyringe";
import { CalenderPort } from "../../port/in/api/calenderPort";

@injectable()
export class CalenderService {
  constructor(
    @inject("CalenderPort") private calendar: CalenderPort
  ) { }

  async createEventList(): Promise<string[]> {
    const events = await this.calendar.fetchEvents();
    const eventList = events.map(event => {
      return `${event.start.dateTime} - ${event.end.dateTime}: ${event.summary}`;
    });
    return eventList;
  }
}
