import { Suspense } from 'react';
import StorePreviewClient from './client';

export default function StorePreviewPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">加载中...</div>}>
      <StorePreviewClient />
    </Suspense>
  );
}
