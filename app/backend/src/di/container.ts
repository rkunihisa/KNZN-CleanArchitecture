import "reflect-metadata";
import { container } from "tsyringe";
import { GoogleCalenderClient } from "../infrastructure/api/googleCalenderClient";
import { CalenderPort } from "../application/port/in/api/calenderPort";

// GoogleCalenderClientをportとして登録
container.register<CalenderPort>("CalenderPort", {
    useClass: GoogleCalenderClient,
});
