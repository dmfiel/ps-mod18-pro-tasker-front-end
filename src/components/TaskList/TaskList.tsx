import { useState } from 'react';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskItem } from '../TaskItem/TaskItem';
import { type Filters, type TaskType } from '../../types';
import { filterTasks } from '../../utils/taskUtils';

// This component shows a list of tasks passed down from its parent which also handles
// the list updates. Task items are shown when they are not deleted and meet the criteria
// specified by the TaskFilter component.

export function TaskList({ tasks }: { tasks: Array<TaskType> }) {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    priority: 'all',
    sort: 'priority',
    searchText: ''
  });

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
      <TaskFilter onFilterChange={onFilterChange} />

      {!tasks || !tasks.length
        ? ''
        : filterTasks(tasks, filters).map(task => (
            <TaskItem key={task._id} task={task} refreshTasks={() => {}} />
          ))}
    </>
  );
}
