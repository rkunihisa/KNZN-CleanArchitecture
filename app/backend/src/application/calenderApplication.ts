import { GoogleCalenderService } from "../domain/service/googleCalenderService";
import { GoogleCalenderClient } from "../infrastructure/googleCalenderClient";

export class CalenderApplication {
  create() {
    // GoogleCalendarClientを実体化する。こいつの見た目はGoogleCalendarInterface
    const googleCalenderClient = new GoogleCalenderClient();
    // GoogleCalenderServiceはGoogleCalenderInterfaceを受け取るので、GoogleCalenderClientを渡せる
    const googleCalenderService = new GoogleCalenderService(googleCalenderClient);

    const eventList = googleCalenderService.createEventList()

    return eventList;
  }
}