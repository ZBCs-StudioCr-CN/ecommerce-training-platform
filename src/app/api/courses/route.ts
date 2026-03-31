import { NextResponse } from 'next/server';
import { getPublishedCourses, getCourseById } from '@/data/courses';

// 获取课程列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // 获取单个课程
      const course = getCourseById(parseInt(id));
      if (!course) {
        return NextResponse.json(
          { success: false, error: '课程不存在' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, course });
    }

    // 获取所有已发布课程
    const courses = getPublishedCourses();
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error('获取课程失败:', error);
    return NextResponse.json(
      { success: false, error: '获取课程失败' },
      { status: 500 }
    );
  }
}
