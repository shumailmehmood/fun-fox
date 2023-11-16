interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  groupId: string;
  lastUpdated: Date;
}

export default Task;
