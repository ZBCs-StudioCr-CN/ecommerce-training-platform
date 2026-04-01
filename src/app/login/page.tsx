'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Globe,
  User,
  Shield,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  Brain,
  Target,
  LineChart,
  AlertTriangle,
  ShoppingCart,
  ShoppingBag,
  Store,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type UserRole = 'admin' | 'teacher' | 'student';

interface RoleConfig {
  id: UserRole;
  title: string;
  description: string;
  icon: typeof Shield;
  color: string;
  bgColor: string;
  redirectPath: string;
}

const roles: RoleConfig[] = [
  {
    id: 'admin',
    title: '院校管理员',
    description: '管理账号、班级、数据报表',
    icon: Shield,
    color: 'text-violet-600',
    bgColor: 'bg-violet-100',
    redirectPath: '/admin/dashboard',
  },
  {
    id: 'teacher',
    title: '授课教师',
    description: '备课、发布实训、考核评分',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    redirectPath: '/teacher/dashboard',
  },
  {
    id: 'student',
    title: '在校学生',
    description: '理论学习、仿真实训、考核',
    icon: User,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    redirectPath: '/student/dashboard',
  },
];

// 三大电商场景
const scenarios = [
  { name: '国内电商', icon: ShoppingCart, platforms: '淘宝/天猫、拼多多、抖音' },
  { name: '跨境平台', icon: ShoppingBag, platforms: '亚马逊、Shopee、Lazada' },
  { name: '外贸独立站', icon: Store, platforms: 'Shopify类建站+运营' },
];

// 四大核心能力
const coreAbilities = [
  { name: '商业决策', icon: Target, desc: 'AI提供选项，学生做决策' },
  { name: '流量逻辑', icon: LineChart, desc: '理解流量背后的商业逻辑' },
  { name: '数据复盘', icon: LineChart, desc: '真正理解数据背后的含义' },
  { name: '风险应对', icon: AlertTriangle, desc: '应对真实市场不确定性' },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = roles.find((r) => r.id === selectedRole)!;

  const handleLogin = async () => {
    setIsLoading(true);
    // 模拟登录
    setTimeout(() => {
      router.push(currentRole.redirectPath);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* 左侧品牌区 */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-center relative z-10 px-16 py-12 h-full">
        <div className="max-w-xl">
          {/* Logo和名称 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">电商实训平台</h1>
              <p className="text-sm text-slate-400">E-commerce Training Platform</p>
            </div>
          </div>

          {/* 核心定位 */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">AI时代电商运营决策能力培养平台</span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              驾驭AI · 培养能力<br />
              <span className="text-blue-400">做不被AI替代的电商人才</span>
            </h2>
          </div>

          {/* 三大电商场景 */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-slate-400 mb-3">三大电商场景全覆盖</h3>
            <div className="flex gap-3">
              {scenarios.map((scenario, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50">
                  <scenario.icon className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{scenario.name}</p>
                    <p className="text-xs text-slate-400">{scenario.platforms}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 四大核心能力 */}
          <div className="mb-10">
            <h3 className="text-sm font-medium text-slate-400 mb-3">四大不可替代的核心能力</h3>
            <div className="grid grid-cols-2 gap-3">
              {coreAbilities.map((ability, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <ability.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{ability.name}</p>
                    <p className="text-xs text-slate-400">{ability.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI辅助设计原则 */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI辅助设计原则</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-purple-200">AI提供选项</span>
              <ArrowRight className="h-4 w-4 text-purple-400" />
              <span className="text-emerald-300">学生做决策</span>
            </div>
          </div>

          {/* 数据展示 */}
          <div className="mt-8 flex items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-slate-400">合作院校</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10,000+</p>
              <p className="text-sm text-slate-400">实训学生</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-sm text-slate-400">电商场景</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-sm text-slate-400">核心能力</p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录区 */}
      <div className="w-full lg:w-[45%] flex items-center justify-center relative z-10 p-6">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-0">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-2xl text-slate-800">欢迎登录</CardTitle>
            <CardDescription className="text-slate-500">选择身份后输入账号密码登录</CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-6">
            {/* 角色选择 */}
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-blue-400 bg-teal-50 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${role.bgColor} flex items-center justify-center mx-auto mb-2`}>
                    <role.icon className={`h-5 w-5 ${role.color}`} />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{role.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                </button>
              ))}
            </div>

            {/* 登录表单 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">账号</label>
                <Input
                  type="text"
                  placeholder={`请输入${currentRole.title}账号`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">密码</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 w-4 h-4" />
                  <span className="text-slate-600">记住账号</span>
                </label>
                <button className="text-blue-500 hover:text-blue-600 hover:underline">忘记密码?</button>
              </div>

              <Button
                className="w-full h-11 text-base bg-slate-900 hover:bg-slate-800 text-white"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    登录中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    登录系统
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>

              {/* 单点登录 */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400">或</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50" 
                onClick={() => alert('单点登录功能')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                院校单点登录
              </Button>
            </div>

            <p className="text-xs text-center text-slate-400">
              登录即表示您同意
              <button className="text-blue-500 hover:underline mx-1">《用户协议》</button>
              和
              <button className="text-blue-500 hover:underline mx-1">《隐私政策》</button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
