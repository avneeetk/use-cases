import React from 'react';
import { X, Shield, Target, FileText, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UseCase {
  id: string;
  title: string;
  category: string;
  detectionMethod: string;
  triggerConditions: string;
  description: string;
  mitreAttack: string[];
  logSources: string[];
  playbooks: string[];
  soarActions: string;
  simulationType: string;
}

interface UseCaseModalProps {
  useCase: UseCase | null;
  onClose: () => void;
}

export const UseCaseModal: React.FC<UseCaseModalProps> = ({ useCase, onClose }) => {
  if (!useCase) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {useCase.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.description}</p>
              </div>

              {/* Detection Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Detection Method
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.detectionMethod}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Category</h4>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                    {useCase.category}
                  </span>
                </div>
              </div>

              {/* Trigger Conditions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Trigger Conditions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.triggerConditions}</p>
              </div>

              {/* MITRE ATT&CK */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">MITRE ATT&CK Mappings</h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.mitreAttack.map((technique, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                    >
                      {technique}
                    </span>
                  ))}
                </div>
              </div>

              {/* Log Sources */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Log Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.logSources.map((source, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Playbooks */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Linked Response Playbooks
                </h4>
                <div className="space-y-2">
                  {useCase.playbooks.map((playbook, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{playbook}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOAR Actions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Automated SOAR Actions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.soarActions}</p>
              </div>

              {/* Simulation Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Simulation Type</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.simulationType}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Use Case
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};