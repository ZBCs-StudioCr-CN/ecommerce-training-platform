import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '电商实训平台',
    template: '%s | 电商实训平台',
  },
  description:
    'AI时代电商运营决策能力培养平台，面向中高职、本科院校电商/跨境电商专业，培养商业决策、流量逻辑、数据复盘、风险应对四大核心能力。',
  keywords: [
    '电商实训',
    '电商教育',
    '跨境电商',
    'AI辅助教学',
    'Shopify',
    '独立站',
    '电商运营',
    '实训平台',
  ],
  authors: [{ name: '电商实训平台团队' }],
  openGraph: {
    title: '电商实训平台 | AI时代电商运营决策能力培养',
    description:
      '面向中高职、本科院校电商/跨境电商专业的AI时代电商运营决策能力培养平台，覆盖国内电商、跨境平台、外贸独立站三大场景。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
