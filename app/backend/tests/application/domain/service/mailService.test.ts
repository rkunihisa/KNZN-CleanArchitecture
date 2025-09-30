import { mock, MockProxy } from 'jest-mock-extended';
import { MailService } from "@src/application/domain/service/mailService";
import { MailPort } from "@src/application/port/in/api/mailPort";

const mockMails = [
  {
    id: "01",
    title: "1の件",
    content: "お世話になっております。",
    publishedAt: { dateTime: '2025-07-02T08:00:00+09:00' }
  },
  {
    id: "02",
    title: "2の件",
    content: "ご無沙汰しております。ほげほげです。",
    publishedAt: { dateTime: '2025-07-03T08:00:00+09:00' }
  },
  {
    id: "03",
    title: "3の件",
    content: "お疲れ様です。わいわいです。",
    publishedAt: { dateTime: '2025-07-04T08:00:00+09:00' }
  }
];

let mailMock: MockProxy<MailPort>;
let mailService: MailService;

describe('MailService', () => {
  beforeEach(() => {
    mailMock = mock<MailPort>();
    mailMock.fetchMails.mockResolvedValue(mockMails);
    mailService = new MailService(mailMock);
  });

  it('getMailTitles()でメールタイトルの一覧が返る', async () => {
    const result = await mailService.getMailTitles();
    expect(result).toEqual([
      "1の件",
      "2の件",
      "3の件"
    ]);
  });

  it('メール本文の最初の5文字を格納した一覧が返る', async () => {
    const result = await mailService.getContentsChara(5);
    expect(result).toEqual([
      "お世話にな",
      "ご無沙汰し",
      "お疲れ様で"
    ]);
  });

  it('一番新しいメールのタイトルを返す', async () => {
    mailMock.fetchMails.mockResolvedValue([
      mockMails[0],
      mockMails[2],
      mockMails[1],
    ]);
    const result = await mailService.getLatestMailTitle();
    expect(result).toEqual("3の件");
  });

  it('fetchedMailsが空の時は空文字を返す', async () => {
    mailMock.fetchMails.mockResolvedValueOnce([]);
    const result = await mailService.getLatestMailTitle();
    expect(result).toEqual("");
  });
});
