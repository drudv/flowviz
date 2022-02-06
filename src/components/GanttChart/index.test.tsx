import React from 'react';
import { render, screen } from '@testing-library/react';
import { SAMPLE_TASKS } from '../../sampleData';
import { prepareGanttData } from './prepareGanttData';
import GanttChart from '.';

jest.mock('./prepareGanttData', () => {
  const originalModule = jest.requireActual('./prepareGanttData');
  return {
    ...originalModule,
    prepareGanttData: jest.fn(originalModule.prepareGanttData),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GanttChart', () => {
  it('renders Gantt data', () => {
    render(<GanttChart startDate="2022-02-07" tasks={SAMPLE_TASKS} />);
    const chart = screen.getByText('Gantt Chart Mock');
    expect(chart).toBeInTheDocument();
    expect(prepareGanttData).toBeCalledWith(SAMPLE_TASKS, '2022-02-07', 8);
  });
});
