import React, { useMemo } from 'react';
import { Gantt, DefaultTheme } from '@dhtmlx/trial-react-gantt';
import * as R from 'ramda';
import moment from 'moment';
import styles from './GanttChart.module.scss';
import { ITask } from '../../types';

export const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_WORK_HOURS_PER_DAY = 8;
const sortByStartHours = R.sortBy(R.prop('startHours'));

const GANTT_COMMON_PROPS = {
  columns: [
    { name: 'text', label: 'Name', width: '100%', align: 'left' },
    { name: 'startDateText', label: 'Start', width: '80px' },
    { name: 'durationHours', label: 'Hours', width: '45px' },
    { name: 'workers', label: 'Crew', width: '45px' },
  ],
  tooltip: (task: any) => {
    console.log('task', task['$x']);
    try {
      const details = JSON.parse(task.detailsJSON);
      return (
        <div className={styles['tooltip']}>
          {details.map(([label, value]: [string, string]) => (
            <div className={styles['tooltip-prop']} key={label}>
              <strong>{label}</strong>: {value}
            </div>
          ))}
        </div>
      );
    } catch (error) {
      return null;
    }
  },
};

interface IGanttLink {
  source: string;
  target: string;
  type: number;
}

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

function prepareGanttData(
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

interface IGanttChartProps {
  tasks: ITask[];
  startDate?: string;
  workHoursPerDay?: number;
}

const GanttChart = ({
  tasks,
  startDate = moment().format(DATE_FORMAT),
  workHoursPerDay = DEFAULT_WORK_HOURS_PER_DAY,
}: IGanttChartProps) => {
  const ganttData = useMemo(
    () => prepareGanttData(tasks, startDate, workHoursPerDay),
    [tasks, startDate],
  );
  return (
    <DefaultTheme>
      <Gantt readonly {...ganttData} {...GANTT_COMMON_PROPS} />
    </DefaultTheme>
  );
};

export default GanttChart;
