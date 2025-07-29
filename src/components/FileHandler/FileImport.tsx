import { useState } from 'react';
import type { Task } from '../../types';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

// This component provides an interface to import tasks from
// a file on the user's computer. Tasks should be formatted as a JSON array
// which is best done as an export from the system.
// Thanks to Amit Chaurasia for an example on using FileReader.
// https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file-in-the-browser

export function FileImport({
  setTasks
}: {
  setTasks: (tasks: Task[]) => void;
}) {
  const [file, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setErrorMessage('');
    setSuccessMessage('');
  }

  function importFile() {
    setErrorMessage('');
    setSuccessMessage('');
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const text: string = String(reader.result);
        if (!text) {
          setErrorMessage('Unable to read import file.');
          return false;
        }

        const newTasks: Task[] = JSON.parse(text);
        if (!newTasks || !Array.isArray(newTasks) || !newTasks.length) {
          setErrorMessage('Unable to find tasks in import file.');
          return false;
        }

        setTasks(newTasks);
        setSuccessMessage(
          `Successfully imported ${newTasks.length} task${
            newTasks.length > 1 ? 's' : ''
          }.`
        );
      } catch (err) {
        setErrorMessage('Unable to read import file.');
        console.error(err);
      }
    };
    if (!file) return false;
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-fit border rounded-md file:bg-blue-100 file:text-blue-500 file:px-2 file:py-1 hover:file:cursor-pointer hover:file:bg-blue-200
   hover:file:text-blue-700 focus:file:bg-blue-200
   focus:file:text-blue-700"
        />
        {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
        <button
          title="Import"
          onClick={importFile}
          className="flex flex-row gap-1 text-blue-500 bg-blue-100 hover:cursor-pointer hover:text-blue-700 hover:bg-blue-200 focus:bg-blue-200 px-3 py-1 rounded-md w-fit"
        >
          <ArrowUpTrayIcon className="size-6 text-blue-600" />
          Import Tasks
        </button>
      </div>
      {errorMessage && (
        <div
          id="errorMessageImport"
          className="mt-2 w-fit p-2 rounded-md text-red-700 bg-red-50 text-xl mx-auto"
        >
          {errorMessage}{' '}
        </div>
      )}
      {successMessage && (
        <div
          id="successMessageImport"
          className="mt-2 w-fit p-2 rounded-md text-green-700 bg-green-100 text-xl mx-auto"
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}

// to do - add file export
