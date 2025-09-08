import { GoogleMailInterface } from "../model/googleMailInterface";
import { GoogleMailType } from "../model/googleMailType";

export class GoogleMailService {
  private googleMail: GoogleMailInterface;

  constructor(googleMail: GoogleMailInterface) {
    this.googleMail = googleMail;
  }

  // - メソッド1. 取得したメールタイトルの一覧を格納したlistを返す
  async getMailTitles(): Promise<string[]> {
    // const fetchedMails = await this.googleMail.fetchMails();
    const fetchedMails = await this.fetch();
    const fetchedMailTitles = fetchedMails.map((value) => value["title"])
    return fetchedMailTitles
  }

  // - メソッド2. メールの本文の最初のn文字を格納したlistを返す
  async getContentsChara(n: number): Promise<string[]> {
    // const fetchedMails = await this.googleMail.fetchMails();
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

  private async fetch(): Promise<GoogleMailType[]> {
    return await this.googleMail.fetchMails();
  }
}
