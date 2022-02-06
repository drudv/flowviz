import React, { useMemo } from 'react';
import { Gantt, DefaultTheme } from '@dhtmlx/trial-react-gantt';
import moment from 'moment';
import styles from './GanttChart.module.scss';
import { ITask } from '../../types';
import { prepareGanttData } from './prepareGanttData';
import { DATE_FORMAT, DEFAULT_WORK_HOURS_PER_DAY } from './constants';

const GANTT_COMMON_PROPS = {
  columns: [
    { name: 'text', label: 'Name', width: '100%', align: 'left' },
    { name: 'startDateText', label: 'Start', width: '80px' },
    { name: 'durationHours', label: 'Hours', width: '45px' },
    { name: 'workers', label: 'Crew', width: '45px' },
  ],
  tooltip: (task: any) => {
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
    [tasks, startDate, workHoursPerDay],
  );
  return (
    <DefaultTheme>
      <Gantt readonly {...ganttData} {...GANTT_COMMON_PROPS} />
    </DefaultTheme>
  );
};

export default GanttChart;
