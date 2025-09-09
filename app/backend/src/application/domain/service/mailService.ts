import { MailPort } from "../../port/in/api/mailPort";
import { MailType } from "../model/mailType";

export class MailService {
  private mail: MailPort;
  constructor(mail: MailPort) {
    this.mail = mail;
  }

  // - メソッド1. 取得したメールタイトルの一覧を格納したlistを返す
  async getMailTitles(): Promise<string[]> {
    const fetchedMails = await this.fetch();
    const fetchedMailTitles = fetchedMails.map((value) => value["title"])
    return fetchedMailTitles
  }

  // - メソッド2. メールの本文の最初のn文字を格納したlistを返す
  async getContentsChara(n: number): Promise<string[]> {
    const fetchedMails = await this.fetch();
    const fetchedSlicedMailContents = fetchedMails.map((value) => value["content"].slice(0, n))
    return fetchedSlicedMailContents
  }

  // - メソッド3. 一番新しいメールのタイトルを返す
  async getLatestMailTitle(): Promise<string> {
    const fetchedMails = await this.fetch();
    if (fetchedMails.length === 0) return "";

    // publishedAt.dateTimeで降順ソート
    const sorted = fetchedMails.sort((a, b) =>
      a.publishedAt.dateTime < b.publishedAt.dateTime ? 1 : -1
    );
    // 最初の要素のタイトルを返す
    return sorted[0].title;
  }

  private async fetch(): Promise<MailType[]> {
    return await this.mail.fetchMails();
  }
}
