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

// 删除资源
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { success: false, error: '缺少资源 key 参数' },
        { status: 400 }
      );
    }

    // 检查文件是否存在
    const exists = await storage.fileExists({ fileKey: key });
    if (!exists) {
      return NextResponse.json(
        { success: false, error: '资源不存在' },
        { status: 404 }
      );
    }

    // 删除文件
    const deleted = await storage.deleteFile({ fileKey: key });

    return NextResponse.json({
      success: deleted,
      message: deleted ? '删除成功' : '删除失败',
    });
  } catch (error) {
    console.error('删除资源失败:', error);
    return NextResponse.json(
      { success: false, error: '删除资源失败' },
      { status: 500 }
    );
  }
}
