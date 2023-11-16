interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  groupId: number;
  lastUpdated: string;
}

export default Task;
