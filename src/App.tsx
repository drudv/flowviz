import React, { useState } from 'react';
import moment from 'moment';
import {
  PageHeader,
  Layout,
  Button,
  Descriptions,
  Typography,
  DatePicker,
} from 'antd';
import TaskUploader from './components/TaskUploader';
import GanttChart from './components/GanttChart';
import { DATE_FORMAT } from './components/GanttChart/constants';
import { ITask } from './types';
import { SAMPLE_TASKS } from './sampleData';
import styles from './App.module.scss';

const { Link } = Typography;

const { Header, Content } = Layout;

function App() {
  const [isUploaderVisible, setUploaderVisible] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [tasks, setTasks] = useState<ITask[]>([]);
  const showUploader = () => setUploaderVisible(true);
  const hideUploader = () => setUploaderVisible(false);
  const hasTasks = tasks.length > 0;
  return (
    <>
      <Layout className={styles['app-layout']}>
        <Header className={styles['app-header']}>
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
            {hasTasks ? (
              <Descriptions size="middle">
                <Descriptions.Item label="Total tasks">
                  {tasks.length}
                </Descriptions.Item>
                <Descriptions.Item label="Start date">
                  <DatePicker
                    size="small"
                    value={startDate}
                    onChange={(value) => setStartDate(value ?? moment())}
                  />
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <>
                There are no tasks to display. Please{' '}
                <Link onClick={showUploader}>upload tasks</Link> or{' '}
                <Link onClick={() => setTasks(SAMPLE_TASKS)}>
                  use sample data
                </Link>
                .
              </>
            )}
          </PageHeader>
        </Header>
        <Content className={styles['app-content']}>
          {hasTasks && (
            <GanttChart
              tasks={tasks}
              startDate={startDate.format(DATE_FORMAT)}
            />
          )}
        </Content>
      </Layout>
      <TaskUploader
        isVisible={isUploaderVisible}
        onOk={(tasks) => {
          setTasks(tasks);
          hideUploader();
        }}
        onCancel={hideUploader}
      />
    </>
  );
}

export default App;
