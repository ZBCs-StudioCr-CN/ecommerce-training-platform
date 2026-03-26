import { NextRequest, NextResponse } from 'next/server';

// 模拟存储（实际项目中应使用数据库）
const progressStore: Record<string, any> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const moduleId = searchParams.get('moduleId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const key = moduleId ? `${userId}_${moduleId}` : userId;
  const progress = progressStore[key] || null;

  return NextResponse.json({
    success: true,
    progress: progress,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleId, data } = body;

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: 'userId and moduleId are required' },
        { status: 400 }
      );
    }

    const key = `${userId}_${moduleId}`;
    progressStore[key] = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Progress saved successfully',
      savedAt: progressStore[key].updatedAt,
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
