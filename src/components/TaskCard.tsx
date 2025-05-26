import type { Task } from '../types';
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from './EditIcon';

interface TaskCardProps {
  task: Task;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const created = new Date(task.createdAt);
  const day = String(created.getDate()).padStart(2, '0');
  const month = String(created.getMonth() + 1).padStart(2, '0');

  return (
    <div
      className={
        `relative flex flex-col justify-between p-4 rounded shadow-md transition-colors ` +
        (task.completed ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-100')
      }
      style={{ minHeight: 120 }}
    >
      {/* Superior */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-semibold leading-none m-0">{task.title}</h3>
          <span className="text-sm text-gray-500 leading-none">{day}/{month}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            title="Editar tarea"
            className="text-blue-200 hover:text-blue-400 transition-colors"
          >
            <EditIcon className="h-6 w-6" />
          </button>
            <button
                onClick={onDelete}
                title="Eliminar tarea"
                className="text-gray-400 hover:text-red-500 transition-colors"
            >
                <DeleteIcon className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* Descripción */}
      <p className="mt-2 flex-grow text-left px-5">{task.description}</p>

      {/* Inferior */}
      <div className="absolute bottom-3 right-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleComplete}
          className="w-5 h-5 accent-green-500"
          title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        />
      </div>
    </div>
  );
}
