import { CalenderService } from "../../../application/domain/service/calenderService";
import { GoogleCalenderClient } from "../api/googleCalenderClient";

export class GetCalenderEventsController {
  async create() {
    const googleCalenderClient = new GoogleCalenderClient();
    const calenderService = new CalenderService(googleCalenderClient);
    const eventList = await calenderService.createEventList()
    return eventList;
  }
}
