export const dynamic = 'force-static';
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

// 获取文档签名 URL
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { success: false, error: '缺少文档 key 参数' },
        { status: 400 }
      );
    }

    // 检查文件是否存在
    const exists = await storage.fileExists({ fileKey: key });
    if (!exists) {
      return NextResponse.json(
        { success: false, error: '文档文件不存在' },
        { status: 404 }
      );
    }

    // 生成签名 URL，有效期 1 小时
    const signedUrl = await storage.generatePresignedUrl({
      key,
      expireTime: 3600,
    });

    return NextResponse.json({
      success: true,
      url: signedUrl,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('获取文档 URL 失败:', error);
    return NextResponse.json(
      { success: false, error: '获取文档 URL 失败' },
      { status: 500 }
    );
  }
}
