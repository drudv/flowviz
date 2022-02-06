declare module '@dhtmlx/trial-react-gantt' {
  import React from 'react';

  declare const Gantt: React.FunctionComponent<IGanttProps>;
  declare const DefaultTheme: React.FunctionComponent;
}

interface IGanttProps {
  tasks?: any[];
  links?: Array<{ source: any; target: any; type?: number }>;
  readonly?: boolean;
}

interface IGanttStatic {
  config: any;
}
