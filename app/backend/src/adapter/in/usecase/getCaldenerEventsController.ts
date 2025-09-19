// import { CalenderService } from "../../../application/domain/service/calenderService";
// import { GoogleCalenderClient } from "../../../infrastructure/api/googleCalenderClient";

// class GetCalenderEventsController {
//   constructor(private calenderService: CalenderService) {}

//   async create() {
//     const events = await this.calenderService.createEventList();
//     return events;
//   }
// }

// // このファイルが直接実行された場合のみmain()を実行
// if (require.main === module) {
//   // GoogleCalenderClientは、DI（依存性注入）で渡すのが正しい
//   const googleCalenderClient = new GoogleCalenderClient();
//   const calenderService = new CalenderService(googleCalenderClient);
//   const getCalenderEventsController = new GetCalenderEventsController(calenderService);
//   const eventList = getCalenderEventsController.create();
//   console.log(eventList);
// }
import "reflect-metadata";
import { container } from "tsyringe";
import { CalenderService } from "../../../application/domain/service/calenderService";

export class GetCalenderEventsController {
  constructor(private calenderService: CalenderService) { }

  async create() {
    return await this.calenderService.createEventList();
  }
}

// このファイルが直接実行された場合のみmain()を実行
if (require.main === module) {
  // DIコンテナからインスタンスを取得
  const calenderService = container.resolve(CalenderService);
  const controller = new GetCalenderEventsController(calenderService);

  controller.create().then(eventList => {
    console.log(eventList);
  });
}
