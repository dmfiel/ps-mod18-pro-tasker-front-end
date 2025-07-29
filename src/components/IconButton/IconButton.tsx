import { HeartIcon as HeartFilledIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  Cog8ToothIcon
} from '@heroicons/react/24/outline';

const BUTTON_CLASS =
  'text-blue-500 hover:text-blue-700 dark:hover:text-blue-200 dark:hover:bg-blue-700 hover:bg-blue-200 ml-1 p-1 rounded-md w-fit';
const ICON_CLASS = 'size-6 text-blue-500';

function IconButton({
  icon,
  title,
  status = true,
  onClick
}: {
  icon: string;
  title: string;
  status: boolean;
  onClick: () => void;
}) {
  const lcIcon = icon.toLowerCase();
  return (
    <button
      title={title}
      onClick={() => {
        onClick;
      }}
      className={BUTTON_CLASS}
    >
      {status && lcIcon === 'edit' && <PencilIcon className={ICON_CLASS} />}{' '}
      {status && lcIcon === 'delete' && <TrashIcon className={ICON_CLASS} />}{' '}
      {status && lcIcon === 'view' && (
        <MagnifyingGlassIcon className={ICON_CLASS} />
      )}{' '}
      {status && lcIcon === 'add' && <PlusIcon className={ICON_CLASS} />}{' '}
      {status && lcIcon === 'up' && <ArrowUpTrayIcon className={ICON_CLASS} />}{' '}
      {status && lcIcon === 'down' && (
        <ArrowDownTrayIcon className={ICON_CLASS} />
      )}{' '}
      {status && lcIcon === 'settings' && (
        <Cog8ToothIcon className={ICON_CLASS} />
      )}
      {status && lcIcon === 'heart' && (
        <HeartFilledIcon className={ICON_CLASS} />
      )}
      {!status && lcIcon === 'heart' && (
        <HeartOutlineIcon className={ICON_CLASS} />
      )}
    </button>
  );
}

export default IconButton;
