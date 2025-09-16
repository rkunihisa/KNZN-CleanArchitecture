import { CalenderService } from "../../../application/domain/service/calenderService";
import { GoogleCalenderClient } from "../../../infrastructure/api/googleCalenderClient";

class GetCalenderEventsController {
  constructor(private calenderService: CalenderService) {}

  async create() {
    const events = await this.calenderService.createEventList();
    return events;
  }
}

// このファイルが直接実行された場合のみmain()を実行
if (require.main === module) {
  // GoogleCalenderClientは、DI（依存性注入）で渡すのが正しい
  const googleCalenderClient = new GoogleCalenderClient();
  const calenderService = new CalenderService(googleCalenderClient);
  const getCalenderEventsController = new GetCalenderEventsController(calenderService);
  const eventList = getCalenderEventsController.create();
  console.log(eventList);
}
