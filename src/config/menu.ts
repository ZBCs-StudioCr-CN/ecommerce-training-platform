import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  MessageCircle,
  Award,
  FileText,
  Settings,
  Calendar,
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
}

export const teacherMenuItems: MenuItem[] = [
  { id: 'dashboard', label: '教学控制台', icon: LayoutDashboard, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'practice', label: '实训管理', icon: ClipboardList, href: '/teacher/practice' },
  { id: 'exam', label: '考试管理', icon: FileText, href: '/teacher/exam' },
  { id: 'assessment', label: '考核评分', icon: Award, href: '/teacher/assessment' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];
