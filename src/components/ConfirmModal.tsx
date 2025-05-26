interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  labelConfirm: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, message, labelConfirm, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-80 shadow-lg">
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition"
          >
            {labelConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}