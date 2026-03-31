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

// 文档前缀
const DOCUMENT_PREFIX = 'courses/documents/';

// 获取文档列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || DOCUMENT_PREFIX;

    // 列出对象存储中的文档文件
    const result = await storage.listFiles({
      prefix,
      maxKeys: 100,
    });

    // 过滤文档文件并格式化
    const documents = result.keys
      .filter((key) => {
        const ext = key.split('.').pop()?.toLowerCase();
        return ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext || '');
      })
      .map((key) => {
        const parts = key.replace(prefix, '').split('/');
        const fileName = parts[parts.length - 1];
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        
        return {
          key,
          fileName,
          title: fileName.replace(/\.[^/.]+$/, ''),
          type: ext,
        };
      });

    return NextResponse.json({
      success: true,
      documents,
      hasMore: result.isTruncated,
    });
  } catch (error) {
    console.error('获取文档列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取文档列表失败' },
      { status: 500 }
    );
  }
}
