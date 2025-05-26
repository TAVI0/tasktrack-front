import React, { useState, useEffect } from 'react';
import type { TaskPayload, Task } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  initialTask?: Task | null;
  onSave: (taskData: TaskPayload, id?: number) => void;
  onClose: () => void;
}

export default function NewTaskModal({ isOpen, initialTask = null, onSave, onClose }: NewTaskModalProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const taskData: TaskPayload = {
      title: title.trim(),
      description: description.trim(),
      completed: initialTask?.completed ?? false,
      dueDate: initialTask?.dueDate ?? null,
    };

    onSave(taskData, initialTask?.id);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-100 rounded p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialTask ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Título:</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descripción:</label>
            <textarea
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
