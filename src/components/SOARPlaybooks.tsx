import React, { useState } from 'react';
import { GitBranch, Plus, Edit, Trash2, Play, Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Playbook {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: number;
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
  author: string;
  executionTime: string;
}

const playbooks: Playbook[] = [
  {
    id: '1',
    name: 'Ransomware Response Playbook',
    description: 'Comprehensive response procedure for ransomware incidents including isolation, analysis, and recovery',
    category: 'Malware Response',
    steps: 12,
    lastModified: '2024-01-15',
    status: 'active',
    author: 'Security Team',
    executionTime: '15-30 min'
  },
  {
    id: '2',
    name: 'Credential Abuse Response',
    description: 'Response workflow for credential stuffing and brute force attacks',
    category: 'Identity Security',
    steps: 8,
    lastModified: '2024-01-14',
    status: 'active',
    author: 'SOC Analyst',
    executionTime: '10-15 min'
  },
  {
    id: '3',
    name: 'Data Exfiltration Investigation',
    description: 'Investigation and containment procedures for data theft incidents',
    category: 'Data Protection',
    steps: 15,
    lastModified: '2024-01-10',
    status: 'draft',
    author: 'Incident Response',
    executionTime: '30-45 min'
  },
  {
    id: '4',
    name: 'Phishing Email Response',
    description: 'Automated response for phishing email detection and user notification',
    category: 'Email Security',
    steps: 6,
    lastModified: '2024-01-12',
    status: 'active',
    author: 'Email Security Team',
    executionTime: '5-10 min'
  },
  {
    id: '5',
    name: 'Insider Threat Investigation',
    description: 'Comprehensive investigation workflow for insider threat scenarios',
    category: 'Insider Threat',
    steps: 20,
    lastModified: '2024-01-08',
    status: 'active',
    author: 'HR Security',
    executionTime: '60-90 min'
  }
];

export const SOARPlaybooks: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Malware Response', 'Identity Security', 'Data Protection', 'Email Security', 'Insider Threat', 'Network Security'];

  const filteredPlaybooks = playbooks.filter(playbook => 
    selectedCategory === 'All' || playbook.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SOAR Playbooks</h1>
          <p className="text-gray-600 dark:text-gray-400">Automated response workflows and procedures</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Playbook</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <GitBranch className="w-5 h-5 text-gray-400" />
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaybooks.map((playbook, index) => (
          <motion.div
            key={playbook.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {playbook.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {playbook.description}
                </p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(playbook.status)}`}>
                {playbook.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>{playbook.steps} steps</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>{playbook.executionTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span>{playbook.author}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Modified {playbook.lastModified}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};