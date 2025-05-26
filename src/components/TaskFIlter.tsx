export type TaskStatusFilter = 'all' | 'completed' | 'pending';

interface TaskFilterProps {
  status: TaskStatusFilter;
  date: string;
  onChange: (filters: { status: TaskStatusFilter; date: string }) => void;
}

export default function TaskFilter({ status, date, onChange }: TaskFilterProps) {
  const handleClear = () => {
    onChange({ status: 'all', date: '' });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 mt-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Filtro por estado */}
        <select
          value={status}
          onChange={e => onChange({ status: e.target.value as TaskStatusFilter, date })}
          className="w-full sm:w-40 bg-gray-700 text-gray-100 px-3 py-1 rounded focus:outline-none"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>

        {/* Filtro por fecha de creación */}
        <input
          type="date"
          value={date}
          onChange={e => onChange({ status, date: e.target.value })}
          className="w-full sm:w-40 bg-gray-700 text-gray-100 px-3 py-1 rounded focus:outline-none"
        />

        {/* Botón limpiar */}
        <button
          onClick={handleClear}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white transition"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
