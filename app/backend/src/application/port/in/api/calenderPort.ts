import { CalenderEventType } from '../../../domain/model/calenderEventType';

export interface CalenderPort {
  fetchEvents(): Promise<CalenderEventType[]>;
}
