import { NextResponse } from 'next/server';
import { S3Storage } from 'coze-coding-dev-sdk';

// 初始化对象存储客户端
const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

// 课程视频前缀映射
const COURSE_VIDEO_PREFIX = 'courses/videos/';

// 获取视频列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || COURSE_VIDEO_PREFIX;

    // 列出对象存储中的视频文件
    const result = await storage.listFiles({
      prefix,
      maxKeys: 100,
    });

    // 过滤视频文件并格式化
    const videos = result.keys
      .filter((key) => {
        const ext = key.split('.').pop()?.toLowerCase();
        return ['mp4', 'webm', 'mov', 'avi'].includes(ext || '');
      })
      .map((key) => {
        // 从 key 中提取文件名和分类
        const parts = key.replace(prefix, '').split('/');
        const fileName = parts[parts.length - 1];
        const category = parts.length > 1 ? parts[0] : '未分类';
        
        return {
          key,
          fileName,
          category,
          title: fileName.replace(/\.[^/.]+$/, ''), // 移除扩展名作为标题
        };
      });

    return NextResponse.json({
      success: true,
      videos,
      hasMore: result.isTruncated,
    });
  } catch (error) {
    console.error('获取视频列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取视频列表失败' },
      { status: 500 }
    );
  }
}
