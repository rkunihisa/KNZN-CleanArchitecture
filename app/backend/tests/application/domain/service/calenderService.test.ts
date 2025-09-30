import { mock } from 'jest-mock-extended';

import { CalenderService } from '@src/application/domain/service/calenderService';
import { CalenderPort } from '@src/application/port/in/api/calenderPort';

const calenderMock = mock<CalenderPort>();
    calenderMock.fetchEvents.mockResolvedValue([
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

describe('CalenderService', () => {
  it('createEventList()で文字列が返る', async () => {
    // Arrange
    const calenderService = new CalenderService(calenderMock);

    // Act
    const result = await calenderService.createEventList();

    // Assert
    expect(result).toEqual([
      '2025-07-01T08:00:00+09:00 - 2025-07-02T08:00:00+09:00: テストイベント1',
      '2025-07-02T08:00:00+09:00 - 2025-07-03T08:00:00+09:00: テストイベント2'
    ]);
  });
});
