import { mock } from 'jest-mock-extended';

import { GoogleCalenderService } from '@src/domain/service/googleCalenderService';
import { GoogleCalenderInterface } from '@src/domain/model/googleCalenderInterface';

describe('GoogleCalenderService', () => {
  it('createEventList()で文字列が返る', async () => {
    // Arrange
    const googleCalenderMock = mock<GoogleCalenderInterface>();
    googleCalenderMock.fetchEvents.mockResolvedValue([
      {
        id: '1',
        summary: 'テストイベント1',
        start: { dateTime: '2025-07-01T08:00:00+09:00' },
        end: { dateTime: '2025-07-02T08:00:00+09:00' }
      },
      {
        id: '2',
        summary: 'テストイベント2',
        start: { dateTime: '2025-07-02T08:00:00+09:00' },
        end: { dateTime: '2025-07-03T08:00:00+09:00' }
      }
    ]);
    const googleCalenderService = new GoogleCalenderService(googleCalenderMock);

    // Act
    const result = await googleCalenderService.createEventList();

    // Assert
    expect(result).toEqual([
      '2025-07-01T08:00:00+09:00 - 2025-07-02T08:00:00+09:00: テストイベント1',
      '2025-07-02T08:00:00+09:00 - 2025-07-03T08:00:00+09:00: テストイベント2'
    ]);
  });
});