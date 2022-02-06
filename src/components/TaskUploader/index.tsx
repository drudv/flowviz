import React, { useEffect } from 'react';
import { Button, Modal, Upload, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './TaskUploader.module.scss';
import { ITask } from '../../types';

const { TextArea } = Input;

interface ITaskUploadProps {
  isVisible?: boolean;
  onOk: (tasks: ITask[]) => void;
  onCancel: () => void;
}

class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const testIds = {
  tasksUpload: 'tasks-upload',
  tasksJSON: 'tasks-json',
};

export function parseTasks(tasksJSON: string): ITask[] {
  try {
    return JSON.parse(tasksJSON);
  } catch (error) {
    throw new ValidationError('Invalid JSON format');
  }
  // TODO: validate against task schema
}

const TaskUploader = ({ isVisible, onOk, onCancel }: ITaskUploadProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, isVisible]);

  return (
    <Modal
      forceRender
      title="Upload Tasks"
      getContainer={false}
      visible={isVisible}
      okButtonProps={{
        disabled: form.getFieldError('tasksJSON').length > 0,
      }}
      onOk={() => {
        const tasks = parseTasks(form.getFieldValue('tasksJSON'));
        onOk(tasks);
      }}
      onCancel={onCancel}
    >
      <Form form={form}>
        <Upload
          accept=".json"
          showUploadList={false}
          beforeUpload={(file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
              const result = event.target?.result;
              if (typeof result === 'string') {
                form.setFieldsValue({ tasksJSON: result });
              }
            };
            reader.readAsText(file);

            // Prevent upload
            return false;
          }}
        >
          <Button data-testid={testIds.tasksUpload} icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
        <p className={styles['textbox-desc']}>
          or paste tasks into the text box:
        </p>
        <Form.Item
          name="tasksJSON"
          rules={[
            {
              async validator(_rule, value) {
                parseTasks(value);
              },
            },
          ]}
        >
          <TextArea rows={10} data-testid={testIds.tasksJSON} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskUploader;
