import type { Priority, Task, TaskStatus } from '../../types';

// This component provides a task dashboard showing the number of tasks
// in each category of priority and status. The information is color-coded
// to allow at a glance understanding of how many critical tasks are open.

export function Dashboard({ tasks }: { tasks: Task[] }) {
  function taskCount(priority: Priority, status: TaskStatus): number {
    return tasks.filter(t => t.priority === priority && t.status === status)
      .length;
  }

  return (
    <div className="grid grid-cols-[repeat(4,auto))] p-5 bg-green-50 border rounded-lg w-fit mx-auto text-center font-medium">
      <div></div>
      <div></div>
      <div>Priority</div>
      <div></div>
      <div className="text-end pr-1 border-r border-b border-black">Status</div>
      <div className="text-red-500 px-4 border-b border-black">High</div>
      <div className="text-yellow-500 px-4 border-b border-black">Medium</div>
      <div className="text-green-500 px-4 border-b border-black">Low</div>
      <div className="text-yellow-500 text-end pr-1 border-r border-black">
        Pending
      </div>
      <div className="text-red-500">{taskCount('1-high', 'To Do')}</div>
      <div className="text-yellow-500">{taskCount('2-medium', 'To Do')}</div>
      <div className="text-green-500">{taskCount('3-low', 'To Do')}</div>
      <div className="text-blue-500 text-end  pr-1 border-r border-black">
        In Progress
      </div>
      <div className="text-red-500">{taskCount('1-high', 'In Progress')}</div>
      <div className="text-yellow-500">
        {taskCount('2-medium', 'In Progress')}
      </div>
      <div className="text-green-500">{taskCount('3-low', 'In Progress')}</div>
      <div className="text-green-500 text-end  pr-1 border-r border-black">
        Completed
      </div>
      <div className="text-green-500">{taskCount('1-high', 'Done')}</div>
      <div className="text-green-500">{taskCount('2-medium', 'Done')}</div>
      <div className="text-green-500">{taskCount('3-low', 'Done')}</div>
    </div>
  );
}
