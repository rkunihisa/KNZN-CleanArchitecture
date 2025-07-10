import { GoogleCalenderService } from '../../../src/domain/service/googleCalenderService';

// GoogleCalenderInterfaceをモック化
jest.mock('../../../src/domain/model/googleCalenderInterface', () => {
  return {
    GoogleCalenderMock: jest.fn().mockImplementation(() => ({
      fetchEvents: jest.fn().mockResolvedValue([{
        id: '1',
        summary: 'テストイベント1',
        start: { datetime: '2025-07-01T08:00:00+09:00' },
        end: { datetime: '2025-07-02T08:00:00+09:00' }
      },
      {
        id: '2',
        summary: 'テストイベント2',
        start: { datetime: '2025-07-02T08:00:00+09:00' },
        end: { datetime: '2025-07-03T08:00:00+09:00' }
      }
      ])
    }))
  };
});

describe('GoogleCalenderService', () => {
  it('createEventList()で文字列が返る', async () => {
    // Arrange
    const { GoogleCalenderMock } = require('../../../src/domain/model/googleCalenderInterface');
    const googleCalenderMockInstance = new GoogleCalenderMock();
    const googleCalenderService = new GoogleCalenderService(googleCalenderMockInstance);
    // Act
    const result = await googleCalenderService.createEventList();
    // Assert
    expect(result).toEqual([
      '2025-07-01T08:00:00Z - 2025-07-02T11:00:00Z: テストイベント'
    ]);
  });
});