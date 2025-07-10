import { CalenderApplication } from '../../src/application/calenderApplication';

// GoogleCalenderServiceとGoogleCalenderClientをモック化
jest.mock('../infrastructure/googleCalenderClient');
jest.mock('../domain/service/googleCalenderService', () => {
  return {
    GoogleCalenderService: jest.fn().mockImplementation(() => ({
      createEventList: jest.fn().mockResolvedValue([
        '2025-07-08T10:00:00Z - 2025-07-08T11:00:00Z: テストイベント'
      ])
    }))
  };
});

describe('CalenderApplication', () => {
  it('create()でイベント一覧が取得できる', async () => {
    const app = new CalenderApplication();
    const result = await app.create();
    expect(result).toEqual([
      '2025-07-08T10:00:00Z - 2025-07-08T11:00:00Z: テストイベント'
    ]);
  });
});