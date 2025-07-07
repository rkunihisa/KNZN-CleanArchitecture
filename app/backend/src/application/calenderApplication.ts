import { GoogleCalendarService } from "../domain/service/googleCalenderService";
import { GoogleCalendarClient } from "../infrastructure/googleCalenderClient";

export class CalendarApplication {
  create() {
    // GoogleCalendarClientを実体化する。こいつの見た目はGoogleCalendarInterface
    GoogleCalendarClient googleCalendarClient = new GoogleCalendarClient();
    // GoogleCalendarServiceはGoogleCalendarInterfaceを受け取るので、GoogleCalendarClientを渡せる
    GoogleCalendarService googleCalendarService = new GoogleCalendarService(googleCalendarClient);

    event = googleCalendarService.fetch()
  }
}