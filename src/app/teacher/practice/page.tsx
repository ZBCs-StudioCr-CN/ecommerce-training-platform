'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  LogOut,
  Globe,
  Plus,
  Save,
  Calendar,
  Clock,
  Target,
  Users,
  AlertTriangle,
  Info,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { teacherMenuItems } from '@/config/menu';

const practiceModules = [
  { id: 'market', name: '市场调研与选品', weight: 15 },
  { id: 'build', name: '独立站搭建', weight: 20 },
  { id: 'traffic', name: '流量推广', weight: 25 },
  { id: 'conversion', name: '转化运营', weight: 20 },
  { id: 'data', name: '数据分析', weight: 15 },
  { id: 'compliance', name: '合规风控', weight: 5 },
];

const riskScenarios = [
  { id: 'ad-ban', name: '广告账户封禁', description: '模拟Google/Facebook广告账户被暂停场景' },
  { id: 'shipping', name: '物流延误', description: '模拟国际物流延误、包裹丢失场景' },
  { id: 'ip', name: '侵权投诉', description: '模拟产品侵权被投诉下架场景' },
  { id: 'exchange', name: '汇率波动', description: '模拟汇率剧烈波动影响利润场景' },
  { id: 'policy', name: '政策变更', description: '模拟目标市场政策突变场景' },
];

export default function TeacherPracticePage() {
  const [activeMenu, setActiveMenu] = useState('practice');
  const [taskType, setTaskType] = useState<'module' | 'comprehensive'>('module');
  const [selectedModule, setSelectedModule] = useState('build');
  const [selectedClass, setSelectedClass] = useState('电商2201班');
  const [riskEnabled, setRiskEnabled] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const toggleRisk = (id: string) => {
    if (selectedRisks.includes(id)) {
      setSelectedRisks(selectedRisks.filter((r) => r !== id));
    } else {
      setSelectedRisks([...selectedRisks, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">教师端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">8</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">王老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">王</div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {teacherMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-6">
        {/* 页面标题 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">发布实训任务</h2>
            <p className="text-slate-500">创建分项技能实训或综合项目实战任务</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
            <Button>立即发布</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：任务配置 */}
          <div className="col-span-2 space-y-6">
            {/* 任务类型选择 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>任务类型</CardTitle>
                <CardDescription>选择实训任务类型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTaskType('module')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      taskType === 'module'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        taskType === 'module' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Target className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">分项技能实训</span>
                    </div>
                    <p className="text-sm text-slate-500">针对单个技能模块进行专项训练，带步骤引导</p>
                  </button>
                  <button
                    onClick={() => setTaskType('comprehensive')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      taskType === 'comprehensive'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        taskType === 'comprehensive' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Users className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">综合项目实战</span>
                    </div>
                    <p className="text-sm text-slate-500">全流程闭环，支持个人或小组（4-6人）组队</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 基础信息 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>基础信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">任务名称</label>
                    <Input placeholder="请输入任务名称，如：独立站搭建实训" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">目标班级</label>
                    <select
                      className="w-full h-10 px-3 border rounded-lg text-sm"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option>电商2201班</option>
                      <option>跨境电商2203班</option>
                      <option>电商2202班</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">开始时间</label>
                    <Input type="datetime-local" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">结束时间</label>
                    <Input type="datetime-local" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">虚拟预算（美元）</label>
                    <Input type="number" placeholder="如：5000" defaultValue="5000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">目标市场</label>
                    <select className="w-full h-10 px-3 border rounded-lg text-sm">
                      <option>美国</option>
                      <option>英国</option>
                      <option>德国</option>
                      <option>法国</option>
                      <option>日本</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 模块选择与评分权重 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>实训模块与评分权重</CardTitle>
                <CardDescription>选择包含的实训模块，自定义评分权重</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {practiceModules.map((module) => (
                    <div key={module.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedModule === module.id}
                        onChange={() => setSelectedModule(module.id)}
                        className="rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{module.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-20 h-8 text-center"
                          defaultValue={module.weight}
                          min={0}
                          max={100}
                        />
                        <span className="text-sm text-slate-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">权重总计需为 100%</p>
              </CardContent>
            </Card>

            {/* 风险场景设置 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      风险场景模拟
                    </CardTitle>
                    <CardDescription>开启后可模拟真实运营中的突发状况</CardDescription>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={riskEnabled}
                      onChange={(e) => setRiskEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </CardHeader>
              {riskEnabled && (
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {riskScenarios.map((risk) => (
                      <button
                        key={risk.id}
                        onClick={() => toggleRisk(risk.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedRisks.includes(risk.id)
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`h-4 w-4 ${
                            selectedRisks.includes(risk.id) ? 'text-amber-500' : 'text-slate-400'
                          }`} />
                          <span className="font-medium text-sm">{risk.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">{risk.description}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* 右侧：预览与说明 */}
          <div className="space-y-6">
            {/* 任务预览 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>任务预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">任务类型</p>
                    <p className="font-medium">{taskType === 'module' ? '分项技能实训' : '综合项目实战'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">目标班级</p>
                    <p className="font-medium">{selectedClass}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">评分模块</p>
                    <p className="font-medium">{practiceModules.find(m => m.id === selectedModule)?.name}</p>
                  </div>
                  {riskEnabled && selectedRisks.length > 0 && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-600 mb-1">风险场景</p>
                      <p className="font-medium text-amber-800">{selectedRisks.length} 项已启用</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 发布须知 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="h-5 w-5" />
                  发布须知
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>任务发布后，学生可在实训端查看并开始操作</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>可实时监控学生实训进度，对异常情况进行辅导</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>实训结束后需进行考核评分，生成成绩报告</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>风险场景可在任务进行中动态调整</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 小组设置 */}
            {taskType === 'comprehensive' && (
              <Card className="border-0 shadow-lg shadow-slate-200/50">
                <CardHeader>
                  <CardTitle>小组设置</CardTitle>
                  <CardDescription>综合实战支持团队协作</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">每组人数</label>
                    <select className="w-full h-10 px-3 border rounded-lg text-sm">
                      <option>4人</option>
                      <option>5人</option>
                      <option>6人</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">分组方式</label>
                    <select className="w-full h-10 px-3 border rounded-lg text-sm">
                      <option>系统随机分配</option>
                      <option>学生自由组队</option>
                      <option>教师手动分配</option>
                    </select>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-slate-500 mb-2">角色分工建议</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">运营</Badge>
                      <Badge variant="outline">推广</Badge>
                      <Badge variant="outline">美工</Badge>
                      <Badge variant="outline">客服</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
