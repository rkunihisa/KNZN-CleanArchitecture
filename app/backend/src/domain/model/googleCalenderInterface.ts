import { GoogleCalenderEventType } from './googleCalenderEventType';

export interface GoogleCalenderInterface {
  fetchEvents(): Promise<GoogleCalenderEventType[]>;
}
