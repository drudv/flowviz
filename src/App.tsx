import React, { useState } from 'react';
import { PageHeader, Button, Descriptions, Typography } from 'antd';
import TaskUploader from './components/TaskUploader';
import { ITask } from './types';
import { SAMPLE_TASKS } from './sampleData';
import './App.css';

const { Link } = Typography;

function App() {
  const [isUploaderVisible, setUploaderVisible] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const showUploader = () => setUploaderVisible(true);
  const hideUploader = () => setUploaderVisible(false);
  return (
    <div className="App">
      <PageHeader
        ghost={false}
        title="flowviz"
        subTitle="Construction flow visualization tool"
        extra={[
          <Button key="upload" type="primary" onClick={showUploader}>
            Upload tasks
          </Button>,
        ]}
      >
        {tasks.length === 0 ? (
          <>
            There are no tasks to display. Please{' '}
            <Link onClick={showUploader}>upload tasks</Link> or{' '}
            <Link
              onClick={() => {
                setTasks(SAMPLE_TASKS);
              }}
            >
              use sample data
            </Link>
            .
          </>
        ) : (
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="Total tasks">
              {tasks.length}
            </Descriptions.Item>
          </Descriptions>
        )}
      </PageHeader>
      <TaskUploader
        isVisible={isUploaderVisible}
        onOk={(tasks) => {
          setTasks(tasks);
          hideUploader();
        }}
        onCancel={hideUploader}
      />
    </div>
  );
}

export default App;
