import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Play, 
  Shield, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';
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
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const useCases: UseCase[] = [
  {
    id: '1',
    title: 'Ransomware File Encryption Detection',
    category: 'Malware Execution',
    detectionMethod: 'EDR - Behavioral Analysis',
    triggerConditions: 'Rapid file extension changes (>50 files/min) + entropy analysis',
    description: 'Advanced behavioral detection system that monitors file system changes and analyzes entropy patterns to identify ransomware encryption activities. Uses machine learning algorithms to distinguish between legitimate file operations and malicious encryption patterns.',
    mitreAttack: ['T1486 - Data Encrypted for Impact', 'T1083 - File and Directory Discovery'],
    logSources: ['Windows Event Logs', 'EDR Telemetry', 'File System Monitoring'],
    playbooks: ['Ransomware Response Playbook', 'Endpoint Isolation Procedure'],
    severity: 'critical'
  },
  {
    id: '2',
    title: 'Credential Stuffing Attack',
    category: 'Credential Abuse',
    detectionMethod: 'XDR - Log Correlation',
    triggerConditions: '100+ failed logins from single IP within 10 minutes',
    description: 'Multi-source correlation engine that identifies credential stuffing attacks by analyzing authentication patterns across web applications, VPNs, and internal systems. Includes geolocation analysis and device fingerprinting.',
    mitreAttack: ['T1110.004 - Credential Stuffing', 'T1078 - Valid Accounts'],
    logSources: ['Authentication Logs', 'Web Application Logs', 'Network Traffic'],
    playbooks: ['Credential Abuse Response', 'Account Lockout Procedure'],
    severity: 'high'
  },
  {
    id: '3',
    title: 'Living-off-the-Land Binary Abuse',
    category: 'Malware Execution',
    detectionMethod: 'EDR - Process Monitoring',
    triggerConditions: 'PowerShell.exe with encoded commands + suspicious parent process',
    description: 'Sophisticated process behavior analysis that detects abuse of legitimate system binaries. Monitors command-line arguments, parent-child process relationships, and network connections to identify malicious use of trusted tools.',
    mitreAttack: ['T1059.001 - PowerShell', 'T1027 - Obfuscated Files'],
    logSources: ['Process Creation Events', 'Command Line Logs', 'Network Connections'],
    playbooks: ['Living-off-the-Land Response', 'Process Analysis Procedure'],
    severity: 'high'
  },
  {
    id: '4',
    title: 'Lateral Movement via SMB',
    category: 'Network Threat',
    detectionMethod: 'XDR - Network Analysis',
    triggerConditions: 'Multiple SMB connections to different hosts + admin share access',
    description: 'Network traffic analysis combined with authentication monitoring to detect lateral movement patterns. Identifies unusual SMB activity, credential reuse, and administrative share access across multiple systems.',
    mitreAttack: ['T1021.002 - SMB/Windows Admin Shares', 'T1570 - Lateral Tool Transfer'],
    logSources: ['Network Traffic Logs', 'Windows Security Events', 'SMB Logs'],
    playbooks: ['Lateral Movement Response', 'Network Isolation Procedure'],
    severity: 'high'
  },
  {
    id: '5',
    title: 'Phishing Email with Malicious Attachment',
    category: 'Email Threat',
    detectionMethod: 'XDR - Email Gateway + Sandbox',
    triggerConditions: 'Email with suspicious attachment + sandbox detonation alerts',
    description: 'Comprehensive email security solution that combines gateway filtering with dynamic sandbox analysis. Detects sophisticated phishing attempts through content analysis, sender reputation, and behavioral indicators.',
    mitreAttack: ['T1566.001 - Spearphishing Attachment', 'T1204.002 - Malicious File'],
    logSources: ['Email Gateway Logs', 'Sandbox Reports', 'User Activity Logs'],
    playbooks: ['Phishing Response Playbook', 'Email Quarantine Procedure'],
    severity: 'medium'
  },
  {
    id: '6',
    title: 'Privilege Escalation via Token Manipulation',
    category: 'Privilege Escalation',
    detectionMethod: 'EDR - Token Monitoring',
    triggerConditions: 'Token duplication/impersonation + privilege level changes',
    description: 'Advanced Windows token monitoring system that detects privilege escalation attempts through token manipulation techniques. Monitors access token creation, duplication, and impersonation activities.',
    mitreAttack: ['T1134 - Access Token Manipulation', 'T1068 - Exploitation for Privilege Escalation'],
    logSources: ['Windows Security Events', 'EDR Process Logs', 'Token Activity Logs'],
    playbooks: ['Privilege Escalation Response', 'Token Analysis Procedure'],
    severity: 'critical'
  },
  {
    id: '7',
    title: 'Data Exfiltration via DNS Tunneling',
    category: 'Data Exfiltration',
    detectionMethod: 'XDR - DNS Traffic Analysis',
    triggerConditions: 'Unusual DNS query patterns + large data volumes',
    description: 'DNS traffic analysis engine that identifies data exfiltration attempts through DNS tunneling. Uses statistical analysis and machine learning to detect anomalous query patterns and data encoding techniques.',
    mitreAttack: ['T1048.003 - Exfiltration Over Alternative Protocol', 'T1071.004 - DNS'],
    logSources: ['DNS Logs', 'Network Traffic Analysis', 'DLP Alerts'],
    playbooks: ['Data Exfiltration Response', 'DNS Investigation Procedure'],
    severity: 'high'
  },
  {
    id: '8',
    title: 'Insider Threat - Unusual Data Access',
    category: 'Insider Threat',
    detectionMethod: 'XDR - User Behavior Analytics',
    triggerConditions: 'Access to sensitive data outside normal patterns + bulk downloads',
    description: 'User and Entity Behavior Analytics (UEBA) system that establishes baseline behavior patterns and detects anomalous data access activities. Includes risk scoring and contextual analysis.',
    mitreAttack: ['T1530 - Data from Cloud Storage Object', 'T1005 - Data from Local System'],
    logSources: ['File Access Logs', 'User Activity Logs', 'Database Audit Logs'],
    playbooks: ['Insider Threat Investigation', 'Data Access Review Procedure'],
    severity: 'medium'
  }
];

const categories = ['All Categories', 'Malware Execution', 'Credential Abuse', 'Network Threat', 'Email Threat', 'Privilege Escalation', 'Data Exfiltration', 'Insider Threat'];

export const UseCasesDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredUseCases = useCases.filter(useCase => {
    const matchesCategory = selectedCategory === 'All Categories' || useCase.category === selectedCategory;
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.detectionMethod.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Malware Execution': return <Shield className="w-4 h-4 text-red-500" />;
      case 'Network Threat': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Detection Use Cases
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Cybersecurity scenarios for XDR, EDR, and SOAR platforms
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {filteredUseCases.length} use cases
            </span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search use cases..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Use Case
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Detection Method
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trigger Conditions
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUseCases.map((useCase, index) => (
                  <React.Fragment key={useCase.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-gray-50 transition-all duration-200 ${
                        hoveredRow === useCase.id ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'
                      } ${expandedRow === useCase.id ? 'bg-blue-50/20' : ''}`}
                      onMouseEnter={() => setHoveredRow(useCase.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            useCase.severity === 'critical' ? 'bg-red-500' :
                            useCase.severity === 'high' ? 'bg-orange-500' :
                            useCase.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {useCase.title}
                            </div>
                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getSeverityColor(useCase.severity)}`}>
                              {useCase.severity.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(useCase.category)}
                          <span className="text-sm font-medium text-gray-700">
                            {useCase.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                          {useCase.detectionMethod}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700 max-w-xs">
                          {useCase.triggerConditions.length > 60 
                            ? `${useCase.triggerConditions.substring(0, 60)}...`
                            : useCase.triggerConditions
                          }
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            onClick={() => setExpandedRow(expandedRow === useCase.id ? null : useCase.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {expandedRow === useCase.id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <span>Details</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Play className="w-4 h-4" />
                            <span>Simulate</span>
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                    
                    {/* Expanded Row Content */}
                    <AnimatePresence>
                      {expandedRow === useCase.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td colSpan={5} className="px-6 py-0">
                            <div className="bg-blue-50/30 rounded-lg p-6 mb-4 border border-blue-100">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                    {useCase.description}
                                  </p>
                                  
                                  {/* <h4 className="font-semibold text-gray-900 mb-3">MITRE ATT&CK Mappings</h4> */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {/* {useCase.mitreAttack.map((technique, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full border border-red-200"
                                      >
                                        {technique}
                                      </span>
                                    ))} */}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">Log Sources</h4>
                                  <div className="space-y-2 mb-4">
                                    {useCase.logSources.map((source, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span className="text-sm text-gray-700">{source}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* <h4 className="font-semibold text-gray-900 mb-3">Response Playbooks</h4> */}
                                  <div className="space-y-2">
                                    {useCase.playbooks.map((playbook, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        {/* <ExternalLink className="w-3 h-3 text-blue-500" /> */}
                                        {/* <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                          {playbook} */}
                                        {/* </span> */}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing {filteredUseCases.length} of {useCases.length} use cases
        </div>
        <div className="flex items-center space-x-4">
          <span>Last updated: 2 minutes ago</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};