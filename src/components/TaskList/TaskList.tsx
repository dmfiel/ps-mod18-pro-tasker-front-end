import { useState } from 'react';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskItem } from '../TaskItem/TaskItem';
import {
  blankTask,
  type Filters,
  type Task,
  type TaskListProps
} from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { filterTasks } from '../../utils/taskUtils';

// This component shows a list of tasks passed down from its parent which also handles
// the list updates. Task items are shown when they are not deleted and meet the criteria
// specified by the TaskFilter component.

export function TaskList({
  tasks,
  onStatusChange,
  onDelete,
  onSave
}: TaskListProps) {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    priority: 'all',
    sort: 'priority',
    searchText: ''
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formTask, setFormTask] = useState<Task>(blankTask);

  function onFilterChange({ status, priority, sort, searchText }: Filters) {
    const newFilters: Filters = { ...filters };
    if (status) newFilters.status = status;
    if (priority) newFilters.priority = priority;
    if (sort) newFilters.sort = sort;
    newFilters.searchText = searchText ? searchText.toLowerCase() : '';
    setFilters(newFilters);
  }

  return (
    <>
      <TaskFilter
        onFilterChange={onFilterChange}
        onEdit={setFormTask}
        onShowForm={() => setShowForm(true)}
      />
      {showForm && (
        <TaskForm
          key={formTask.id}
          onSave={onSave}
          onHideForm={() => setShowForm(false)}
          taskInput={formTask}
        />
      )}
      {!tasks || !tasks.length
        ? ''
        : filterTasks(tasks, filters).map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={setFormTask}
              onShowForm={() => setShowForm(true)}
            />
          ))}
    </>
  );
}
