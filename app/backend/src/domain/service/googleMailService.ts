// add service here
// 要件

import { GoogleMailInterface } from "../model/googleMailInterface";

export class GoogleMailService {
    private googleMail: GoogleMailInterface;
    
    constructor(googleMail: GoogleMailInterface) {
        this.googleMail = googleMail;
    }
	
  // - メソッド1. 取得したメールタイトルの一覧を格納したlistを返す
  async getMailTitles(): Promise<string[]> {
    const fetchedMails = await this.googleMail.fetchMails();
    const fetchedMailTitles = fetchedMails.map((value) => value["id"])
		console.log("fetchedMailTitles:", fetchedMailTitles)
    return fetchedMailTitles
  }    

  // - メソッド2. メールの本文の最初の10文字を格納したlistを返す
  // - メソッド3. 一番新しいメールのタイトルを返す

} 
