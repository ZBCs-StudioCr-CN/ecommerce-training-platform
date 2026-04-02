import { useRouter } from 'next/navigation';

/**
 * 退出登录钩子
 * 清除localStorage中的用户信息并跳转到登录页
 */
export function useLogout() {
  const router = useRouter();

  const handleLogout = () => {
    // 清除所有用户相关的localStorage数据
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_info');
    // 清除店铺数据（如果需要）
    // localStorage.removeItem('ecommerce_practice_stores');
    
    // 跳转到登录页
    router.push('/login');
  };

  return handleLogout;
}

/**
 * 获取当前用户角色
 */
export function getUserRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_role');
}

/**
 * 获取当前用户信息
 */
export function getUserInfo(): { role: string; username: string; loginTime: string } | null {
  if (typeof window === 'undefined') return null;
  const info = localStorage.getItem('user_info');
  return info ? JSON.parse(info) : null;
}

/**
 * 检查是否已登录
 */
export function isLoggedIn(): boolean {
  return getUserRole() !== null;
}
