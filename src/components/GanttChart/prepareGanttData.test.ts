import { prepareGanttData } from './prepareGanttData';
import { SAMPLE_TASKS } from '../../sampleData';

describe('GanttChart / prepareGanttData', () => {
  it('produces correct result', () => {
    expect(prepareGanttData(SAMPLE_TASKS, '2022-02-07', 8)).toEqual({
      tasks: [
        {
          id: 'A000000001',
          text: 'Excavate: Core Wall',
          details:
            'Duration: 16h;\nWorkers: 1 (Brigade 1);\nEquipment: 1x Excavator;',
          detailsJSON:
            '[["Duration","16h"],["Workers","1 (Brigade 1)"],["Equipment","1x Excavator"]]',
          duration: 2,
          durationHours: 16,
          workers: 1,
          type: 'task',
          progress: 0,
          start_date: '2022-02-07',
          startDateText: '2022-02-07',
        },
        {
          id: 'A000000002',
          text: 'Backfill and Compaction',
          details:
            'Duration: 24h;\nWorkers: 1 (Brigade 2);\nEquipment: 1x Tandem Roller;',
          detailsJSON:
            '[["Duration","24h"],["Workers","1 (Brigade 2)"],["Equipment","1x Tandem Roller"]]',
          duration: 3,
          durationHours: 24,
          workers: 1,
          type: 'task',
          progress: 0,
          start_date: '2022-02-10',
          startDateText: '2022-02-10',
        },
        {
          id: 'A000000003',
          text: 'Brick Laying',
          details: 'Duration: 16h;\nWorkers: 1 (Brigade 3);',
          detailsJSON: '[["Duration","16h"],["Workers","1 (Brigade 3)"]]',
          duration: 2,
          durationHours: 16,
          workers: 1,
          type: 'task',
          progress: 0,
          start_date: '2022-02-12',
          startDateText: '2022-02-12',
        },
      ],
      links: [
        { source: 'A000000001', target: 'A000000002', type: 0 },
        { source: 'A000000001', target: 'A000000003', type: 0 },
        { source: 'A000000002', target: 'A000000003', type: 0 },
      ],
    });
  });
});
