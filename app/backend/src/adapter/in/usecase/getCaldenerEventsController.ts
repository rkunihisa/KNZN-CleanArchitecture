import { CalenderService } from "../../../application/domain/service/calenderService";
import { GoogleCalenderClient } from "../infrastructure/googleCalenderClient";

class GetCalenderEventsController {
  async create() {
    return eventList;
  }
}

// このファイルが直接実行された場合のみmain()を実行
if (require.main === module) {
  const googleCalenderClient = new GoogleCalenderClient();
  const calenderService = new CalenderService(googleCalenderClient);
  const getCalenderEventsController = new GetCalenderEventsController(calenderService);
  const eventList = getCalenderEventsController.create();
  console.log(eventList);
}
