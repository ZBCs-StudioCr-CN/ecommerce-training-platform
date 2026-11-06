import { Suspense } from 'react';
import StoreAdminClient from './client';

export default function StoreAdminPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">加载中...</div>}>
      <StoreAdminClient />
    </Suspense>
  );
}
