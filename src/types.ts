export interface ITask {
  taskCode: string;
  operationName: string;
  elementName: string;
  duration: number;
  startHours: number;
  endHours: number;
  crew: {
    name: string;
    assignment: number;
  };
  equipment: Array<{
    name: string;
    quantity: number;
  }>;
  dependencies?: string[];
}
