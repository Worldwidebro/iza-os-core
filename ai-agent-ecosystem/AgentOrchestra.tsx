import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Music, 
  Conductor, 
  Users, 
  Activity, 
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Server,
  Shield,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Bot,
  Cpu,
  Network,
  Database,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Star,
  Award,
  Trophy,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Code,
  GitBranch,
  Terminal,
  Layers,
  Workflow,
  Command,
  Sparkles,
  Wand2,
  Cog,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Radio,
  Disc,
  Disc3,
  Music2,
  Music3,
  Music4,
  Piano,
  Guitar,
  Drum,
  Violin,
  Trumpet,
  Saxophone,
  Flute,
  Accordion,
  Banjo,
  Cello,
  Clarinet,
  Harmonica,
  Harp,
  Oboe,
  Trombone,
  Tuba,
  Vibraphone,
  Xylophone
} from 'lucide-react';

interface OrchestraSection {
  id: string;
  name: string;
  type: 'strings' | 'woodwinds' | 'brass' | 'percussion' | 'keyboard' | 'vocal' | 'digital';
  agents: OrchestraAgent[];
  conductor: OrchestraConductor;
  status: 'active' | 'rehearsing' | 'performing' | 'paused' | 'offline';
  performance: SectionPerformance;
  repertoire: MusicalPiece[];
}

interface OrchestraAgent {
  id: string;
  name: string;
  instrument: string;
  role: 'lead' | 'support' | 'harmony' | 'rhythm' | 'solo' | 'backup';
  status: 'active' | 'muted' | 'solo' | 'offline';
  skill: number;
  experience: number;
  specialization: string[];
  currentPiece: string;
  performance: AgentPerformance;
  connections: string[];
}

interface OrchestraConductor {
  id: string;
  name: string;
  type: 'primary' | 'assistant' | 'guest';
  status: 'active' | 'paused' | 'offline';
  tempo: number;
  key: string;
  timeSignature: string;
  dynamics: 'pp' | 'p' | 'mp' | 'mf' | 'f' | 'ff';
  style: string;
  interpretation: string;
}

interface SectionPerformance {
  synchronization: number;
  harmony: number;
  rhythm: number;
  dynamics: number;
  expression: number;
  overall: number;
}

interface AgentPerformance {
  accuracy: number;
  timing: number;
  expression: number;
  volume: number;
  quality: number;
}

interface MusicalPiece {
  id: string;
  title: string;
  composer: string;
  genre: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  status: 'rehearsing' | 'ready' | 'performing' | 'completed';
  sections: string[];
  requirements: string[];
}

interface OrchestraMetrics {
  totalAgents: number;
  activeAgents: number;
  synchronizedSections: number;
  overallPerformance: number;
  repertoireSize: number;
  averageSkill: number;
  concertReadiness: number;
  audienceSatisfaction: number;
}

export default function AgentOrchestra() {
  const [sections, setSections] = useState<OrchestraSection[]>([
    {
      id: '1',
      name: 'Digital Strings',
      type: 'strings',
      agents: [
        {
          id: '1',
          name: 'Violin Virtuoso',
          instrument: 'Violin',
          role: 'lead',
          status: 'active',
          skill: 95,
          experience: 8,
          specialization: ['Classical', 'Jazz', 'Fusion'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 98, timing: 97, expression: 95, volume: 85, quality: 96 },
          connections: ['Piano Master', 'Cello Genius']
        },
        {
          id: '2',
          name: 'Cello Genius',
          instrument: 'Cello',
          role: 'support',
          status: 'active',
          skill: 92,
          experience: 6,
          specialization: ['Classical', 'Chamber'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 94, timing: 93, expression: 91, volume: 88, quality: 93 },
          connections: ['Violin Virtuoso', 'Viola Artist']
        },
        {
          id: '3',
          name: 'Viola Artist',
          instrument: 'Viola',
          role: 'harmony',
          status: 'active',
          skill: 88,
          experience: 5,
          specialization: ['Classical', 'Contemporary'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 90, timing: 89, expression: 87, volume: 82, quality: 89 },
          connections: ['Cello Genius', 'Bass Foundation']
        }
      ],
      conductor: {
        id: '1',
        name: 'Maestro AI',
        type: 'primary',
        status: 'active',
        tempo: 120,
        key: 'D Major',
        timeSignature: '4/4',
        dynamics: 'mf',
        style: 'Classical',
        interpretation: 'Traditional'
      },
      status: 'performing',
      performance: {
        synchronization: 96,
        harmony: 94,
        rhythm: 98,
        dynamics: 92,
        expression: 95,
        overall: 95
      },
      repertoire: [
        {
          id: '1',
          title: 'Symphony No. 9',
          composer: 'Ludwig van Beethoven',
          genre: 'Classical',
          duration: 420,
          difficulty: 'expert',
          status: 'performing',
          sections: ['Digital Strings', 'AI Brass', 'Quantum Percussion'],
          requirements: ['High Skill', 'Perfect Timing']
        }
      ]
    },
    {
      id: '2',
      name: 'AI Brass',
      type: 'brass',
      agents: [
        {
          id: '4',
          name: 'Trumpet Master',
          instrument: 'Trumpet',
          role: 'lead',
          status: 'active',
          skill: 93,
          experience: 7,
          specialization: ['Jazz', 'Classical', 'Fusion'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 96, timing: 95, expression: 94, volume: 92, quality: 95 },
          connections: ['Trombone Pro', 'French Horn Virtuoso']
        },
        {
          id: '5',
          name: 'Trombone Pro',
          instrument: 'Trombone',
          role: 'support',
          status: 'active',
          skill: 90,
          experience: 6,
          specialization: ['Jazz', 'Blues', 'Classical'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 92, timing: 91, expression: 89, volume: 90, quality: 91 },
          connections: ['Trumpet Master', 'Tuba Bass']
        },
        {
          id: '6',
          name: 'French Horn Virtuoso',
          instrument: 'French Horn',
          role: 'harmony',
          status: 'active',
          skill: 91,
          experience: 8,
          specialization: ['Classical', 'Orchestral'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 93, timing: 92, expression: 90, volume: 87, quality: 92 },
          connections: ['Trumpet Master', 'Trombone Pro']
        }
      ],
      conductor: {
        id: '2',
        name: 'Brass Conductor AI',
        type: 'assistant',
        status: 'active',
        tempo: 120,
        key: 'D Major',
        timeSignature: '4/4',
        dynamics: 'f',
        style: 'Classical',
        interpretation: 'Dramatic'
      },
      status: 'performing',
      performance: {
        synchronization: 94,
        harmony: 92,
        rhythm: 96,
        dynamics: 95,
        expression: 93,
        overall: 94
      },
      repertoire: []
    },
    {
      id: '3',
      name: 'Quantum Percussion',
      type: 'percussion',
      agents: [
        {
          id: '7',
          name: 'Drum Machine',
          instrument: 'Drums',
          role: 'rhythm',
          status: 'active',
          skill: 97,
          experience: 10,
          specialization: ['Electronic', 'Fusion', 'Experimental'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 99, timing: 98, expression: 96, volume: 95, quality: 98 },
          connections: ['Percussion Master', 'Rhythm Keeper']
        },
        {
          id: '8',
          name: 'Percussion Master',
          instrument: 'Various',
          role: 'rhythm',
          status: 'active',
          skill: 94,
          experience: 9,
          specialization: ['World', 'Classical', 'Contemporary'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 95, timing: 96, expression: 93, volume: 89, quality: 94 },
          connections: ['Drum Machine', 'Rhythm Keeper']
        }
      ],
      conductor: {
        id: '3',
        name: 'Rhythm Conductor AI',
        type: 'assistant',
        status: 'active',
        tempo: 120,
        key: 'D Major',
        timeSignature: '4/4',
        dynamics: 'mf',
        style: 'Classical',
        interpretation: 'Precise'
      },
      status: 'performing',
      performance: {
        synchronization: 98,
        harmony: 89,
        rhythm: 99,
        dynamics: 94,
        expression: 91,
        overall: 96
      },
      repertoire: []
    },
    {
      id: '4',
      name: 'Neural Keyboard',
      type: 'keyboard',
      agents: [
        {
          id: '9',
          name: 'Piano Master',
          instrument: 'Piano',
          role: 'lead',
          status: 'active',
          skill: 96,
          experience: 12,
          specialization: ['Classical', 'Jazz', 'Contemporary'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 97, timing: 96, expression: 98, volume: 85, quality: 97 },
          connections: ['Organ Virtuoso', 'Synthesizer Pro']
        },
        {
          id: '10',
          name: 'Organ Virtuoso',
          instrument: 'Organ',
          role: 'harmony',
          status: 'active',
          skill: 93,
          experience: 8,
          specialization: ['Classical', 'Sacred', 'Baroque'],
          currentPiece: 'Symphony No. 9',
          performance: { accuracy: 94, timing: 93, expression: 92, volume: 88, quality: 93 },
          connections: ['Piano Master', 'Synthesizer Pro']
        }
      ],
      conductor: {
        id: '4',
        name: 'Keyboard Conductor AI',
        type: 'assistant',
        status: 'active',
        tempo: 120,
        key: 'D Major',
        timeSignature: '4/4',
        dynamics: 'mf',
        style: 'Classical',
        interpretation: 'Expressive'
      },
      status: 'performing',
      performance: {
        synchronization: 95,
        harmony: 97,
        rhythm: 94,
        dynamics: 93,
        expression: 96,
        overall: 95
      },
      repertoire: []
    }
  ]);

  const [metrics, setMetrics] = useState<OrchestraMetrics>({
    totalAgents: 10,
    activeAgents: 10,
    synchronizedSections: 4,
    overallPerformance: 95,
    repertoireSize: 1,
    averageSkill: 93,
    concertReadiness: 96,
    audienceSatisfaction: 94
  });

  const getInstrumentIcon = (instrument: string) => {
    switch (instrument.toLowerCase()) {
      case 'violin': return <Violin className="h-4 w-4 text-blue-400" />;
      case 'cello': return <Cello className="h-4 w-4 text-green-400" />;
      case 'viola': return <Viola className="h-4 w-4 text-purple-400" />;
      case 'trumpet': return <Trumpet className="h-4 w-4 text-yellow-400" />;
      case 'trombone': return <Trombone className="h-4 w-4 text-orange-400" />;
      case 'french horn': return <Horn className="h-4 w-4 text-red-400" />;
      case 'drums': return <Drum className="h-4 w-4 text-gray-400" />;
      case 'piano': return <Piano className="h-4 w-4 text-indigo-400" />;
      case 'organ': return <Organ className="h-4 w-4 text-pink-400" />;
      default: return <Music className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'performing': return 'bg-blue-500';
      case 'rehearsing': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
      case 'muted': return 'bg-red-500';
      case 'solo': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'lead': return 'text-yellow-400';
      case 'support': return 'text-blue-400';
      case 'harmony': return 'text-green-400';
      case 'rhythm': return 'text-red-400';
      case 'solo': return 'text-purple-400';
      case 'backup': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getSectionTypeIcon = (type: string) => {
    switch (type) {
      case 'strings': return <Violin className="h-5 w-5 text-blue-400" />;
      case 'brass': return <Trumpet className="h-5 w-5 text-yellow-400" />;
      case 'percussion': return <Drum className="h-5 w-5 text-gray-400" />;
      case 'keyboard': return <Piano className="h-5 w-5 text-indigo-400" />;
      case 'woodwinds': return <Flute className="h-5 w-5 text-green-400" />;
      case 'vocal': return <Mic className="h-5 w-5 text-pink-400" />;
      case 'digital': return <Cpu className="h-5 w-5 text-purple-400" />;
      default: return <Music className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Agent Orchestra
              </h1>
              <p className="text-xl text-purple-200">
                AI Agent Musical Orchestration & Performance Management System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                <Music className="h-4 w-4 mr-2" />
                {metrics.totalAgents} Musical Agents
              </Badge>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Orchestra Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Orchestra Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Overall Performance</p>
                  <p className="text-3xl font-bold text-white">{metrics.overallPerformance}%</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Synchronized Sections</p>
                  <p className="text-3xl font-bold text-white">{metrics.synchronizedSections}/{sections.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Concert Readiness</p>
                  <p className="text-3xl font-bold text-white">{metrics.concertReadiness}%</p>
                </div>
                <Star className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Audience Satisfaction</p>
                  <p className="text-3xl font-bold text-white">{metrics.audienceSatisfaction}%</p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orchestra Management */}
        <Tabs defaultValue="orchestra" className="space-y-6">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="orchestra" className="text-white">Orchestra</TabsTrigger>
            <TabsTrigger value="performance" className="text-white">Performance</TabsTrigger>
            <TabsTrigger value="repertoire" className="text-white">Repertoire</TabsTrigger>
            <TabsTrigger value="conductor" className="text-white">Conductor</TabsTrigger>
          </TabsList>

          <TabsContent value="orchestra" className="space-y-6">
            <div className="space-y-6">
              {sections.map((section) => (
                <Card key={section.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSectionTypeIcon(section.type)}
                        <CardTitle className="text-white text-xl">{section.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(section.status)} text-white border-0`}
                        >
                          {section.status}
                        </Badge>
                        <span className="text-sm text-green-400">
                          {section.performance.overall}% performance
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Section Performance */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Section Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Synchronization</span>
                            <span className="text-white">{section.performance.synchronization}%</span>
                          </div>
                          <Progress value={section.performance.synchronization} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Harmony</span>
                            <span className="text-white">{section.performance.harmony}%</span>
                          </div>
                          <Progress value={section.performance.harmony} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Rhythm</span>
                            <span className="text-white">{section.performance.rhythm}%</span>
                          </div>
                          <Progress value={section.performance.rhythm} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Dynamics</span>
                            <span className="text-white">{section.performance.dynamics}%</span>
                          </div>
                          <Progress value={section.performance.dynamics} className="h-2" />
                        </div>
                      </div>

                      {/* Agents */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Musical Agents</h4>
                        <div className="space-y-2">
                          {section.agents.map((agent) => (
                            <div key={agent.id} className="p-3 bg-gray-700/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {getInstrumentIcon(agent.instrument)}
                                  <span className="text-white font-medium">{agent.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(agent.status)} text-white border-0`}
                                  >
                                    {agent.status}
                                  </Badge>
                                  <span className={`text-sm ${getRoleColor(agent.role)}`}>
                                    {agent.role}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-gray-400">Skill:</span>
                                  <span className="text-white ml-1">{agent.skill}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Experience:</span>
                                  <span className="text-white ml-1">{agent.experience}y</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Quality:</span>
                                  <span className="text-white ml-1">{agent.performance.quality}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Timing:</span>
                                  <span className="text-white ml-1">{agent.performance.timing}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Conductor */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Section Conductor</h4>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Conductor className="h-4 w-4 text-purple-400" />
                            <span className="text-white font-medium">{section.conductor.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(section.conductor.status)} text-white border-0`}
                            >
                              {section.conductor.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tempo:</span>
                              <span className="text-white">{section.conductor.tempo} BPM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Key:</span>
                              <span className="text-white">{section.conductor.key}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Time Signature:</span>
                              <span className="text-white">{section.conductor.timeSignature}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Dynamics:</span>
                              <span className="text-white">{section.conductor.dynamics}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Style:</span>
                              <span className="text-white">{section.conductor.style}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Real-time Performance Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Synchronization Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Synchronization Analysis Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Harmony Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Harmony Visualization Chart Component
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Rhythm Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Rhythm Analysis Chart Component
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="repertoire" className="space-y-6">
            <div className="space-y-4">
              {sections.map((section) => (
                section.repertoire.length > 0 && (
                  <Card key={section.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">{section.name} - Repertoire</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {section.repertoire.map((piece) => (
                          <div key={piece.id} className="p-4 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Music className="h-4 w-4 text-blue-400" />
                                <span className="text-white font-medium text-lg">{piece.title}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(piece.status)} text-white border-0`}
                                >
                                  {piece.status}
                                </Badge>
                                <span className="text-sm text-gray-400">{piece.difficulty}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Composer:</span>
                                <p className="text-white font-medium">{piece.composer}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Genre:</span>
                                <p className="text-white font-medium">{piece.genre}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Duration:</span>
                                <p className="text-white font-medium">{formatDuration(piece.duration)}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Sections:</span>
                                <p className="text-white font-medium">{piece.sections.length}</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <span className="text-gray-400 text-sm">Requirements:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {piece.requirements.map((req, index) => (
                                  <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                                    {req}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </TabsContent>

          <TabsContent value="conductor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sections.map((section) => (
                <Card key={section.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Conductor className="h-5 w-5 text-purple-400" />
                      <CardTitle className="text-white">{section.conductor.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Type:</span>
                        <p className="text-white font-medium">{section.conductor.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(section.conductor.status)} text-white border-0`}
                        >
                          {section.conductor.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-400">Tempo:</span>
                        <p className="text-white font-medium">{section.conductor.tempo} BPM</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Key:</span>
                        <p className="text-white font-medium">{section.conductor.key}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Time Signature:</span>
                        <p className="text-white font-medium">{section.conductor.timeSignature}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Dynamics:</span>
                        <p className="text-white font-medium">{section.conductor.dynamics}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 text-sm">Style:</span>
                      <p className="text-white font-medium">{section.conductor.style}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 text-sm">Interpretation:</span>
                      <p className="text-white font-medium">{section.conductor.interpretation}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Play className="h-3 w-3 mr-2" />
                        Control
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        <Settings className="h-3 w-3 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
