import { GoogleCalenderEventType } from './service/googleCalenderEventType';

export interface GoogleCalenderInterface {
  fetchEvents(): Promise<GoogleCalenderEventType[]>;
}
