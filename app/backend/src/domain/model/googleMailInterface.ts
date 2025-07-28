import { GoogleMailType } from "./googleMailType";

export interface GoogleMailInterface {
  fetchMails(): Promise<GoogleMailType[]>;
}
