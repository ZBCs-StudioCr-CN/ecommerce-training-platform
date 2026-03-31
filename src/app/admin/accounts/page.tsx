'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  School,
  BarChart3,
  Trophy,
  Settings,
  Bell,
  LogOut,
  Globe,
  Search,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Filter,
  Edit,
  Trash2,
  Key,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const menuItems = [
  { id: 'dashboard', label: '数据总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'accounts', label: '账号管理', icon: Users, href: '/admin/accounts' },
  { id: 'classes', label: '班级管理', icon: School, href: '/admin/classes' },
  { id: 'reports', label: '数据报表', icon: BarChart3, href: '/admin/reports' },
  { id: 'competitions', label: '竞赛管理', icon: Trophy, href: '/admin/competitions' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/admin/settings' },
];

const mockAccounts = [
  { id: 1, name: '张三', username: 'zhangsan', role: 'student', class: '电商2201班', status: 'active', createTime: '2026-03-01', lastLogin: '2026-03-26 09:30' },
  { id: 2, name: '李四', username: 'lisi', role: 'student', class: '电商2201班', status: 'active', createTime: '2026-03-01', lastLogin: '2026-03-25 14:20' },
  { id: 3, name: '王老师', username: 'wanglaoshi', role: 'teacher', class: '-', status: 'active', createTime: '2026-02-15', lastLogin: '2026-03-26 08:15' },
  { id: 4, name: '赵五', username: 'zhaowu', role: 'student', class: '跨境电商2203班', status: 'inactive', createTime: '2026-03-01', lastLogin: '2026-03-10 16:45' },
  { id: 5, name: '陈老师', username: 'chenlaoshi', role: 'teacher', class: '-', status: 'active', createTime: '2026-02-15', lastLogin: '2026-03-25 10:00' },
  { id: 6, name: '孙六', username: 'sunliu', role: 'student', class: '电商2202班', status: 'active', createTime: '2026-03-05', lastLogin: '2026-03-26 07:45' },
  { id: 7, name: '周七', username: 'zhouqi', role: 'student', class: '跨境电商2201班', status: 'frozen', createTime: '2026-03-01', lastLogin: '-' },
  { id: 8, name: '吴老师', username: 'wulaoshi', role: 'teacher', class: '-', status: 'active', createTime: '2026-02-20', lastLogin: '2026-03-24 11:30' },
];

export default function AccountsPage() {
  const [activeMenu, setActiveMenu] = useState('accounts');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);

  const filteredAccounts = mockAccounts.filter((account) => {
    if (roleFilter !== 'all' && account.role !== roleFilter) return false;
    if (statusFilter !== 'all' && account.status !== statusFilter) return false;
    if (searchQuery && !account.name.includes(searchQuery) && !account.username.includes(searchQuery)) return false;
    return true;
  });

  const handleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(filteredAccounts.map((a) => a.id));
    }
  };

  const handleSelectAccount = (id: number) => {
    if (selectedAccounts.includes(id)) {
      setSelectedAccounts(selectedAccounts.filter((a) => a !== id));
    } else {
      setSelectedAccounts([...selectedAccounts, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">正常</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-600">未激活</Badge>;
      case 'frozen':
        return <Badge className="bg-red-100 text-red-700">已冻结</Badge>;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">学生</Badge>;
      case 'teacher':
        return <Badge variant="outline" className="text-purple-600 border-purple-200">教师</Badge>;
      case 'admin':
        return <Badge variant="outline" className="text-amber-600 border-amber-200">管理员</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">管理员端 - 广东XX职业技术学院</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">管理员张</p>
                <p className="text-xs text-slate-500">教务处</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium">
                张
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">账号管理</h2>
          <p className="text-slate-500">管理教师和学生账号，支持批量导入、冻结、重置密码</p>
        </div>

        {/* 操作栏 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="搜索姓名/账号..."
                className="w-64 pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                className="h-9 px-3 border rounded-lg text-sm text-slate-600"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">全部角色</option>
                <option value="student">学生</option>
                <option value="teacher">教师</option>
              </select>
              <select
                className="h-9 px-3 border rounded-lg text-sm text-slate-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="active">正常</option>
                <option value="inactive">未激活</option>
                <option value="frozen">已冻结</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出账号
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              批量导入
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新增账号
            </Button>
          </div>
        </div>

        {/* 批量操作栏 */}
        {selectedAccounts.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-700">
              已选择 {selectedAccounts.length} 个账号
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                重置密码
              </Button>
              <Button variant="outline" size="sm">
                <UserX className="h-4 w-4 mr-2" />
                冻结账号
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                删除
              </Button>
            </div>
          </div>
        )}

        {/* 账号列表 */}
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="w-12 py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">姓名</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">账号</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">角色</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">班级</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">状态</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">创建时间</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">最后登录</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleSelectAccount(account.id)}
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                          account.role === 'teacher' 
                            ? 'bg-gradient-to-br from-purple-500 to-violet-600'
                            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                        }`}>
                          {account.name[0]}
                        </div>
                        <span className="font-medium text-slate-800">{account.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{account.username}</td>
                    <td className="py-3 px-4">{getRoleBadge(account.role)}</td>
                    <td className="py-3 px-4 text-slate-600">{account.class}</td>
                    <td className="py-3 px-4">{getStatusBadge(account.status)}</td>
                    <td className="py-3 px-4 text-slate-500 text-sm">{account.createTime}</td>
                    <td className="py-3 px-4 text-slate-500 text-sm">{account.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Key className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 分页 */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <span className="text-sm text-slate-500">
                共 {filteredAccounts.length} 条记录
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
