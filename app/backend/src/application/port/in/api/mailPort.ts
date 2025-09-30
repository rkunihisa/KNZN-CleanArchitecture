import { MailType } from "../../../domain/model/mailType";

export interface MailPort {
  fetchMails(): Promise<MailType[]>;
}
