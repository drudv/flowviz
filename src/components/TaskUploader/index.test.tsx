import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import TaskUploader, { testIds } from '.';
import { SAMPLE_TASKS } from '../../sampleData';

const SAMPLE_TASKS_JSON = JSON.stringify(SAMPLE_TASKS);

describe('TaskUploader', () => {
  it('allows to paste tasks', async () => {
    const onOk = jest.fn();
    render(<TaskUploader isVisible={true} onOk={onOk} onCancel={() => {}} />);
    const textarea = screen.getByTestId(testIds.tasksJSON);
    await act(async () => {
      fireEvent.change(textarea, {
        target: { value: SAMPLE_TASKS_JSON },
      });
    });
    const button = screen.getByRole('button', { name: 'OK' });
    fireEvent.click(button);
    expect(onOk).toBeCalledWith(SAMPLE_TASKS);
  });

  it('allows to upload tasks', async () => {
    const file = new File([SAMPLE_TASKS_JSON], 'tasks.json', {
      type: 'application/json',
    });
    const onOk = jest.fn();
    const { container } = render(
      <TaskUploader isVisible={true} onOk={onOk} onCancel={() => {}} />,
    );

    const fileInput = container.querySelector('input[type="file"]') as Element;
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const textarea = screen.getByTestId(
      testIds.tasksJSON,
    ) as HTMLTextAreaElement;
    await waitFor(() => {
      expect(textarea.value).toEqual(SAMPLE_TASKS_JSON);
    });

    const button = screen.getByRole('button', { name: 'OK' });
    fireEvent.click(button);
    expect(onOk).toBeCalledWith(SAMPLE_TASKS);
  });

  it('shows error on invalid JSON', async () => {
    render(
      <TaskUploader isVisible={true} onOk={() => {}} onCancel={() => {}} />,
    );
    const textarea = screen.getByTestId(testIds.tasksJSON);
    await act(async () => {
      fireEvent.change(textarea, {
        target: { value: 'wrong JSON' },
      });
    });

    const error = await screen.findByText('Invalid JSON format');
    expect(error).toBeInTheDocument();
  });
});
