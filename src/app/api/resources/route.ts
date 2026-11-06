export const dynamic = 'force-static';
import { NextRequest, NextResponse } from 'next/server';
import { S3Storage } from 'coze-coding-dev-sdk';

// 初始化对象存储客户端
const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

// 文件类型配置
const FILE_CONFIGS = {
  video: {
    prefix: 'courses/videos/',
    allowedExts: ['mp4', 'webm', 'mov', 'avi'],
  },
  document: {
    prefix: 'courses/documents/',
    allowedExts: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'],
  },
};

// 获取资源列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'video' | 'document' | null;
    const category = searchParams.get('category');
    const maxKeys = parseInt(searchParams.get('maxKeys') || '100');

    // 构建 prefix
    let prefix = 'courses/';
    if (type && FILE_CONFIGS[type]) {
      prefix = FILE_CONFIGS[type].prefix;
      if (category) {
        prefix += `${category}/`;
      }
    }

    // 列出文件
    const result = await storage.listFiles({
      prefix,
      maxKeys,
    });

    // 过滤和格式化
    const resources = result.keys
      .map((key) => {
        // 解析路径
        const parts = key.split('/');
        const fileName = parts[parts.length - 1];
        
        // 判断类型
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        const isVideo = FILE_CONFIGS.video.allowedExts.includes(ext);
        const isDocument = FILE_CONFIGS.document.allowedExts.includes(ext);
        
        if (!isVideo && !isDocument) return null;

        // 解析分类
        const relativePath = key.replace('courses/', '');
        const pathParts = relativePath.split('/');
        const resourceType = pathParts[0]; // videos 或 documents
        const resourceCategory = pathParts.length > 2 ? pathParts[1] : '未分类';

        // 提取标题（移除时间戳前缀和扩展名）
        const cleanName = fileName.replace(/^\d+_/, '').replace(/\.[^/.]+$/, '');

        return {
          key,
          fileName,
          title: cleanName,
          type: ext,
          resourceType: resourceType === 'videos' ? 'video' : 'document',
          category: resourceCategory,
        };
      })
      .filter(Boolean);

    // 按类型分组统计
    const stats = {
      video: resources.filter(r => r?.resourceType === 'video').length,
      document: resources.filter(r => r?.resourceType === 'document').length,
      categories: [...new Set(resources.map(r => r?.category).filter(Boolean))],
    };

    return NextResponse.json({
      success: true,
      data: {
        resources,
        stats,
        hasMore: result.isTruncated,
      },
    });
  } catch (error) {
    console.error('获取资源列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取资源列表失败' },
      { status: 500 }
    );
  }
}
