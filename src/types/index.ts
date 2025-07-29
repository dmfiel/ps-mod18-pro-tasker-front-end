export type ProjectType = {
  _id: string;
  name: string;
  description: string;
};

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  project: string;
};

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Sort = 'priority' | 'status' | 'date';
export type Priority = '3-low' | '2-medium' | '1-high';
export const PRIORITY_NAMES = {
  '3-low': 'Low',
  '2-medium': 'Medium',
  '1-high': 'High'
};

export type TaskAttribute =
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'priority'
  | 'dueDate';

// export interface Task {
//   [key: string]: string;
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: Priority;
//   dueDate: string;
// }

export const blankTask = {
  id: '',
  title: '',
  description: '',
  status: 'To Do' as TaskStatus,
  priority: '3-low' as Priority,
  dueDate: ''
};

export interface TaskListProps {
  tasks: TaskType[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onSave: (task: TaskType) => void;
}

export interface TaskFormProps {
  onSave: (task: TaskType) => void;
  onHideForm: () => void;
  taskInput: TaskType;
}

export interface TaskItemProps {
  task: TaskType;
  refreshTasks: () => void;
  // onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  // onDelete: (taskId: string) => void;
  // onEdit: (task: TaskType) => void;
  // onShowForm: () => void;
}

export interface Filters {
  status?: TaskStatus | 'all';
  priority?: Priority | 'all';
  sort?: Sort;
  searchText?: string;
}

export interface TaskFilterProps {
  onFilterChange: (filters: Filters) => void;
  onEdit: (task: TaskType) => void;
  onShowForm: () => void;
}
