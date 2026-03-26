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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* 左侧品牌区 */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center relative z-10 px-12">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <Globe className="h-9 w-9 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">外贸独立站实训平台</h1>
              <p className="text-blue-200">Cross-border E-commerce Training Platform</p>
            </div>
          </div>

          <div className="space-y-6 text-white/80">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">产教融合</h3>
                <p className="text-sm text-white/60">面向中高职、本科院校电商/跨境电商专业，打造"教学-实训-考核-就业"全闭环</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">仿真引擎</h3>
                <p className="text-sm text-white/60">1:1复刻Shopify建站平台，虚拟域名、资金、流量，零风险全流程模拟</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">实战技能</h3>
                <p className="text-sm text-white/60">6大核心技能模块，从0到1搭建独立站，掌握建站、推广、运营全链路技能</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-white/60">合作院校</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10,000+</p>
              <p className="text-sm text-white/60">实训学生</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-sm text-white/60">满意度</p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录区 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">欢迎登录</CardTitle>
            <CardDescription>选择身份后输入账号密码登录</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 角色选择 */}
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
                  className="h-12"
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
                    className="h-12 pr-12"
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
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">记住账号</span>
                </label>
                <button className="text-blue-600 hover:underline">忘记密码？</button>
              </div>

              <Button
                className="w-full h-12 text-base"
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
                  <span className="bg-white px-2 text-slate-500">或</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12" onClick={() => alert('单点登录功能')}>
                <Building2 className="h-4 w-4 mr-2" />
                院校单点登录
              </Button>
            </div>

            <p className="text-xs text-center text-slate-400">
              登录即表示您同意《用户协议》和《隐私政策》
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
