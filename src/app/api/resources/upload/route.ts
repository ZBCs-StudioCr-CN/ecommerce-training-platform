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
    allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'],
    allowedExts: ['mp4', 'webm', 'mov', 'avi'],
    prefix: 'courses/videos/',
    maxSize: 500 * 1024 * 1024, // 500MB
  },
  document: {
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    allowedExts: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'],
    prefix: 'courses/documents/',
    maxSize: 50 * 1024 * 1024, // 50MB
  },
};

// 上传文件
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as 'video' | 'document' | null;
    const category = formData.get('category') as string | null;
    const title = formData.get('title') as string | null;

    if (!file || !type) {
      return NextResponse.json(
        { success: false, error: '缺少文件或类型参数' },
        { status: 400 }
      );
    }

    const config = FILE_CONFIGS[type];
    if (!config) {
      return NextResponse.json(
        { success: false, error: '不支持的文件类型' },
        { status: 400 }
      );
    }

    // 检查文件大小
    if (file.size > config.maxSize) {
      return NextResponse.json(
        { success: false, error: `文件大小超过限制（最大 ${config.maxSize / 1024 / 1024}MB）` },
        { status: 400 }
      );
    }

    // 检查文件类型
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!config.allowedExts.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `不支持的文件格式，支持：${config.allowedExts.join(', ')}` },
        { status: 400 }
      );
    }

    // 生成存储路径
    const fileName = title ? `${title}.${ext}` : file.name;
    const categoryPath = category ? `${category}/` : '';
    const storagePath = `${config.prefix}${categoryPath}${Date.now()}_${fileName}`;

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 上传到对象存储
    const key = await storage.uploadFile({
      fileContent: buffer,
      fileName: storagePath,
      contentType: file.type,
    });

    // 生成访问 URL（用于预览）
    const url = await storage.generatePresignedUrl({
      key,
      expireTime: 3600,
    });

    return NextResponse.json({
      success: true,
      data: {
        key,
        fileName: file.name,
        title: title || file.name.replace(/\.[^/.]+$/, ''),
        type: ext,
        category: category || '未分类',
        size: file.size,
        url,
      },
    });
  } catch (error) {
    console.error('上传文件失败:', error);
    return NextResponse.json(
      { success: false, error: '上传文件失败，请重试' },
      { status: 500 }
    );
  }
}
