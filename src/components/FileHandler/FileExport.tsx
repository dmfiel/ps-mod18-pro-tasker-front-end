import { useState } from 'react';
import type { Task } from '../../types';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// This component provides an interface to save all the tasks into
// a file on the user's computer. Tasks are stored as a JSON array
// which can be imported, viewed, or edited easily.
// Thanks to Kef Nombre for an example of creating and downloading a file.
// https://dev.to/nombrekeff/download-file-from-blob-21ho

export function FileExport({ tasks }: { tasks: Task[] }) {
  const [errorMessage, setErrorMessage] = useState('');

  async function exportFile() {
    setErrorMessage('');

    try {
      // save our tasks array into a Blob file
      const blob = new Blob([JSON.stringify(tasks)], {
        type: 'application/json'
      });
      const blobUrl = URL.createObjectURL(blob);

      // Create a link element to let us download the file
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'tasks_export.json';
      document.body.appendChild(link);

      // Dispatch a click event on the link to download it automatically
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );
      document.body.removeChild(link);
    } catch (err) {
      setErrorMessage('Unable to write to export file.');
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-5">
        <button
          title="Export"
          onClick={exportFile}
          className="flex flex-row gap-1 text-blue-500 bg-blue-100 hover:cursor-pointer hover:text-blue-700 hover:bg-blue-200 focus:bg-blue-200 px-3 py-1 rounded-md w-fit"
        >
          <ArrowDownTrayIcon className="size-6 text-blue-600" />
          Export Tasks
        </button>
      </div>
      {errorMessage && (
        <div
          id="errorMessageExport"
          className="mt-2 w-fit p-2 rounded-md text-red-700 bg-red-50 text-xl mx-auto"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

// to do - add file export
