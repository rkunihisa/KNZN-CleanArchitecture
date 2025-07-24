import { GoogleMailInterface } from "../model/googleMailInterface";
import { GoogleMailType } from "../model/googleMailType";

export class GoogleMailService {
    private googleMail: GoogleMailInterface;

    constructor(googleMail: GoogleMailInterface) {
        this.googleMail = googleMail;
    }

  // - メソッド1. 取得したメールタイトルの一覧を格納したlistを返す
  async getMailTitles(): Promise<string[]> {    
    const fetchedMails = await this.fetch()
    const fetchedMailTitles = fetchedMails.map((value) => value["title"])
    return fetchedMailTitles
  }

  // - メソッド2. メールの本文の最初のn文字を格納したlistを返す
  async getContentsChara(number : number): Promise<string[]> {
    const fetchedMails = await this.fetch()
    const fetchedMailContents = fetchedMails.map((value) => value["content"].slice(0,number))
    return fetchedMailContents
  }
  
  // - メソッド3. 一番新しいメールのタイトルを返す
  async getLatestMailTitle(): Promise<string> {
    const fetchedMails = await this.fetch()
    // publishedAtのdatetimeが最新のtitleだけほしい
    let latestMailTitle = "";
    let latestDate;
    for (let mail of fetchedMails){
      const date = mail["publishedAt"]["dateTime"]
      if (latestDate == null){
        latestDate = date
        latestMailTitle = mail["title"]
      }
      if (latestDate < date) {
        latestDate = date
        latestMailTitle = mail["title"]
      }
    }
    return latestMailTitle
  }

  private async fetch(): Promise<GoogleMailType[]> {
    return await this.googleMail.fetchMails();
  }
}
