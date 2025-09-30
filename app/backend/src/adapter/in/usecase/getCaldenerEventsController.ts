import "reflect-metadata";
import { CalenderService } from "../../../application/domain/service/calenderService";

import { container } from "tsyringe";
import "../../../di/container";

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
