import { GoogleMailService } from "@src/domain/service/googleMailService";
import { GoogleMailInterface } from "@src/domain/model/googleMailInterface";
import { mock } from 'jest-mock-extended';

const googleMailMock = mock<GoogleMailInterface>();
googleMailMock.fetchMails.mockResolvedValue([
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
])

describe('GoogleMailService', () => {
  it('getMailTitles()でメールタイトルの一覧が返る', async () => {
    //Arrange
    const googleMailService = new GoogleMailService(googleMailMock);

    //Act
    const result = await googleMailService.getMailTitles();

    //Assert
    expect(result).toEqual([
      "1の件",
      "2の件",
      "3の件"
    ])
  })

  // メソッド2,3はテストから先に書く（TDD）
  // - メソッド2. メールの本文の最初か任意のn文字を格納したlistを返す
  it('getContentsChara()でメール本文の最初の5文字を格納した一覧が返る', async () => {
    //Arrange
    const googleMailService = new GoogleMailService(googleMailMock);

    //Act
    const result = await googleMailService.getContentsChara(5);

    //Assert
    expect(result).toEqual([
      "お世話にな",
      "ご無沙汰し",
      "お疲れ様で"
    ])
  })

  // - メソッド3. 一番新しいメールのタイトルを返す
  it('getLatestMailTitle()で一番新しいメールのタイトルを返す', async () => {
    //Arrange
    const googleMailService = new GoogleMailService(googleMailMock);

    //Act
    const result = await googleMailService.getLatestMailTitle();

    //Assert
    expect(result).toEqual(
      "3の件"
    )
  })

})


