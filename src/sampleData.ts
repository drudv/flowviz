import { ITask } from './types';

export const SAMPLE_TASKS: ITask[] = [
  {
    taskCode: 'A610360338',
    operationName: 'Close Forms',
    elementName: 'B1_A_L5_Core Wall',
    duration: 16,
    startHours: 1741,
    endHours: 1837,
    crew: {
      name: 'C_Carpenter Crew',
      assignment: 1,
    },
    equipment: [],
    dependencies: ['A163819636'],
  },
  {
    taskCode: 'A913134247',
    operationName: 'Pour Concrete',
    elementName: 'B1_A_L5_Core Wall',
    duration: 8,
    startHours: 1837,
    endHours: 1861,
    crew: {
      name: 'C_Concrete Crew',
      assignment: 1,
    },
    equipment: [
      {
        name: 'Concrete Pump',
        quantity: 1,
      },
    ],
    dependencies: ['A610360338'],
  },
];
