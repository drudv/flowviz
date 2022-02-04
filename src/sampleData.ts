import { ITask } from './types';

export const SAMPLE_TASKS: ITask[] = [
  {
    taskCode: 'A000000001',
    operationName: 'Excavate',
    elementName: 'Core Wall',
    duration: 16,
    startHours: 0,
    endHours: 16,
    crew: {
      name: 'Brigade 1',
      assignment: 1,
    },
    equipment: [
      {
        name: 'Excavator',
        quantity: 1,
      },
    ],
    dependencies: [],
  },
  {
    taskCode: 'A000000002',
    operationName: 'Backfill and Compaction',
    elementName: '',
    duration: 24,
    startHours: 24,
    endHours: 48,
    crew: {
      name: 'Brigade 2',
      assignment: 1,
    },
    equipment: [
      {
        name: 'Tandem Roller',
        quantity: 1,
      },
    ],
    dependencies: ['A000000001'],
  },
  {
    taskCode: 'A000000003',
    operationName: 'Brick Laying',
    elementName: '',
    duration: 16,
    startHours: 36,
    endHours: 52,
    crew: {
      name: 'Brigade 3',
      assignment: 1,
    },
    equipment: [],
    dependencies: ['A000000001', 'A000000002'],
  },
];
