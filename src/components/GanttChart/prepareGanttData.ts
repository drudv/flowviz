import * as R from 'ramda';
import moment from 'moment';
import { ITask } from '../../types';
import { DATE_FORMAT } from './constants';
import { IGanttLink } from './types';

const sortByStartHours = R.sortBy(R.prop('startHours'));

function getTaskDescription(task: ITask) {
  return [
    ['Duration', `${task.duration}h`],
    [
      'Workers',
      task.crew ? `${task.crew.assignment} (${task.crew.name})` : '?',
    ],
    task.equipment.length
      ? [
          'Equipment',
          task.equipment
            .map((item) => `${item.quantity}x ${item.name}`)
            .join(', '),
        ]
      : undefined,
  ].filter((item) => !!item) as Array<[string, string]>;
}

function getTaskDescriptionText(task: ITask) {
  return getTaskDescription(task)
    .map(([label, value]) => `${label}: ${value};`)
    .join('\n');
}

export function prepareGanttData(
  sourceTasks: ITask[],
  startDate: string,
  workHoursPerDay: number,
) {
  const begin = moment(startDate, DATE_FORMAT);
  const links = sourceTasks.reduce<IGanttLink[]>((result, task) => {
    if (task.dependencies?.length) {
      return [
        ...result,
        ...task.dependencies.map((dependency) => ({
          source: dependency,
          target: task.taskCode,
          type: 0,
        })),
      ];
    }
    return result;
  }, []);
  const tasks = sortByStartHours(sourceTasks).map((task) => {
    const startDateText = begin
      .clone()
      .add(task.startHours / workHoursPerDay, 'day')
      .format(DATE_FORMAT);
    return {
      id: task.taskCode,
      text: [task.operationName, task.elementName]
        .filter((item) => !!item)
        .join(': '),
      details: getTaskDescriptionText(task),
      detailsJSON: JSON.stringify(getTaskDescription(task)),
      // Looks like trial version doesn't support duration in hours
      // Converting it to days
      duration: Math.ceil(task.duration / workHoursPerDay),
      durationHours: task.duration,
      workers: task.crew?.assignment || '?',
      type: 'task',
      progress: 0,
      start_date: startDateText,
      startDateText,
    };
  });
  return { tasks, links };
}
