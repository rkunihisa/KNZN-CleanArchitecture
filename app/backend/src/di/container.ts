import "reflect-metadata";
import { container } from "tsyringe";
import { CalenderService } from "../application/domain/service/calenderService";
import { GoogleCalenderClient } from "../infrastructure/api/googleCalenderClient";
import { CalenderPort } from "../application/port/in/api/calenderPort";

// GoogleCalenderClientをportとして登録
container.register<CalenderPort>("CalenderPort", {
    useClass: GoogleCalenderClient,
});

// CalenderServiceは自動で依存解決される（constructorでportを受け取る場合）
container.register<CalenderService>(CalenderService, { useClass: CalenderService });
