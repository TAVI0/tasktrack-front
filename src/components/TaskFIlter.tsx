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
      <div className="flex items-center gap-4">
        {/* Filtro por estado */}
        <div className="flex flex-col">
          <select
            value={status}
            onChange={e => onChange({ status: e.target.value as TaskStatusFilter, date })}
            className="bg-gray-700 text-gray-100 px-3 py-1 rounded focus:outline-none"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        {/* Filtro por fecha de creación */}
        <div className="flex flex-col">
          <input
            type="date"
            value={date}
            onChange={e => onChange({ status, date: e.target.value })}
            className="bg-gray-700 text-gray-100 px-3 py-1 rounded focus:outline-none"
          />
        </div>

        {/* Botón limpiar */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white transition"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}