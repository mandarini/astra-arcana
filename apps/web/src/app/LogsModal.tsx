import * as React from 'react';
import { createPortal } from 'react-dom';
import { SpellCastLog } from '@astra-arcana/spellcasting-sdk';

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SpellCastLog[];
  loading: boolean;
}

export function LogsModal({ isOpen, onClose, logs, loading }: LogsModalProps) {
  if (!isOpen) return null;
  
  // Handle ESC key press to close the modal
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  // Add and remove event listener for Escape key
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Format date in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper to count items and format them for display
  const formatItems = (items: any[]) => {
    if (!items || items.length === 0) return 'None';

    const counts: Record<string, number> = {};
    items.forEach((item) => {
      if (item.name) {
        counts[item.name] = (counts[item.name] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => `${name}${count > 1 ? ` (x${count})` : ''}`)
      .join(', ');
  };

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        // Close the modal when clicking the background (not its children)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 text-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="bg-purple-900 px-6 py-4 flex justify-between items-center border-b border-purple-700">
          <h2 className="text-2xl font-bold text-pink-200">Spell Casting Logs</h2>
          <button
            onClick={onClose}
            className="text-pink-200 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse text-pink-400">
                Loading spell logs...
              </div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center text-gray-400 p-8">
              <p>No spell casting logs available.</p>
              <p className="mt-2 text-sm">
                Cast your first spell to see logs appear here!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Display logs in reverse chronological order (newest first) */}
              {[...logs].reverse().map((log, index) => (
                <div
                  key={index}
                  className="border border-purple-800 rounded-lg bg-purple-950 bg-opacity-50 p-4 hover:bg-purple-900 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-pink-300 font-medium">
                      {log.success ? '✓ Success' : '✗ Failed'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {formatDate(log.timestamp)}
                    </span>
                  </div>

                  <div className="mt-2 text-sm">
                    <div className="mb-1">
                      <span className="text-purple-300 font-medium">
                        Ingredients:
                      </span>{' '}
                      <span className="text-gray-300">
                        {formatItems(log.ingredients)}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">
                        Incantations:
                      </span>{' '}
                      <span className="text-gray-300">
                        {formatItems(log.incantations)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer text */}
        <div className="border-t border-purple-800 px-6 py-3 bg-gray-900 text-center text-sm text-gray-400">
          Press ESC or click outside to close
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LogsModal;
