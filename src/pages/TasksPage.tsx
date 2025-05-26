import { useEffect, useState } from 'react';
import NewTaskModal from '../components/NewTaskModal';
import ConfirmModal from '../components/ConfirmModal';
import { taskService } from '../services/taskService';
import type { Task, TaskPayload } from '../types';
import TaskCard from '../components/TaskCard';
import type { TaskStatusFilter } from '../components/TaskFIlter';
import TaskFilter from '../components/TaskFIlter';

export default function TasksPage({ onLogout }: { onLogout: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [username, setUsername] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [filters, setFilters] = useState<{status: TaskStatusFilter; date: string}>({
    status: 'all',
    date: '',
});

const filteredTasks = tasks.filter(task => {
  if (filters.status === 'completed' && !task.completed) return false;
  if (filters.status === 'pending'   && task.completed)      return false;

  if (filters.date) {
    const createdDate = task.createdAt.split('T')[0];
    if (createdDate !== filters.date) return false;
  }
  return true;
});


useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username || payload.sub || '');
    } catch {}
  }
  }, []);

  useEffect(() => {
    setLoading(true);
    taskService.getAll()
      .then(fetched => { setTasks(fetched); setError(''); })
      .catch(() => setError('No se pudieron cargar las tareas'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await taskService.update(task.id, { ...task, completed: !task.completed });
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    } catch {
      alert('Error al actualizar la tarea');
    }
  };

  const openConfirm = (task: Task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await taskService.delete(taskToDelete.id);
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
    } catch {
      alert('Error al eliminar la tarea');
    } finally {
      setConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const openNewModal = () => { setSelectedTask(null); setShowModal(true); };
  const openEditModal = (task: Task) => { setSelectedTask(task); setShowModal(true); };

  const handleSave = async (taskData: TaskPayload, id?: number) => {
    try {
      if (id != null) {
        const updated = await taskService.update(id, taskData);
        setTasks(prev => prev.map(t => t.id === id ? updated : t));
      } else {
        const created = await taskService.create(taskData);
        setTasks(prev => [...prev, created]);
      }
    } catch {
      alert('Error al guardar la tarea');
    }
  };

  if (loading) return <p className="p-4 text-gray-300">Cargando tareas…</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900  text-gray-100">
      <header className="flex justify-between rounded-lg items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">Hola, {username}</h1>
        <button
          onClick={() => setLogoutConfirm(true)}
          className="text-red-500 hover:underline"
        >
          Cerrar Sesión
        </button>
      </header>

      <TaskFilter
      status={filters.status}
      date={filters.date}
      onChange={setFilters}
    />

      <main className="p-4 grid gap-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task)}
            onEdit={() => openEditModal(task)}
            onDelete={() => openConfirm(task)}
          />
        ))}
        <button
          onClick={openNewModal}
          className="fixed bottom-50 right-90 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl hover:bg-blue-500"
        >
          +
        </button>


        <NewTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={(data) => { handleSave(data, selectedTask?.id); setShowModal(false); }}
          initialTask={selectedTask}
        />
        <ConfirmModal
          isOpen={confirmOpen}
          message={`¿Estás seguro que quieres eliminar "${taskToDelete?.title}"?`}
          labelConfirm="Eliminar"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
        <ConfirmModal
          isOpen={logoutConfirm}
          message="¿Estás seguro que deseas cerrar sesión?"
          labelConfirm="Cerrar Sesión"
          onConfirm={() => { setLogoutConfirm(false); onLogout(); }}
          onCancel={() => setLogoutConfirm(false)}
        />
      </main>
    </div>
  );
}
