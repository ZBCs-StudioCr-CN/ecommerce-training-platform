/**
 * coze-coding-dev-sdk 兼容层
 *
 * 当项目运行在非 Coze 环境（本地开发、Vercel 等）时，
 * 通过 next.config.ts 的 webpack 别名将 'coze-coding-dev-sdk'
 * 指向本模块，保证构建和运行不报错。
 *
 * 在 Coze 环境中，webpack 别名不生效，使用平台注入的真实 SDK。
 */

import { S3Client, ListObjectsV2Command, HeadObjectCommand, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/* -------------------------------------------------------------------------- */
/*                                    Config                                  */
/* -------------------------------------------------------------------------- */

export class Config {
  constructor() {
    // Coze SDK 的 Config 通常读取平台注入的环境变量
    // 在兼容层中无需特殊处理
  }
}

/* -------------------------------------------------------------------------- */
/*                                 HeaderUtils                                */
/* -------------------------------------------------------------------------- */

export const HeaderUtils = {
  extractForwardHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    // Coze 平台会注入一些转发头，这里提取常见的 AI 配置头
    const forwardKeys = [
      'x-ai-provider',
      'x-ai-api-key',
      'x-ai-base-url',
      'x-ai-model',
      'authorization',
      'cookie',
    ];
    for (const key of forwardKeys) {
      const value = headers.get(key);
      if (value) result[key] = value;
    }
    return result;
  },
};

/* -------------------------------------------------------------------------- */
/*                                 S3Storage                                  */
/* -------------------------------------------------------------------------- */

interface S3StorageOptions {
  endpointUrl?: string;
  accessKey?: string;
  secretKey?: string;
  bucketName?: string;
  region?: string;
}

export class S3Storage {
  private client: any = null;
  private bucket: string;

  constructor(options: S3StorageOptions) {
    this.bucket = options.bucketName || '';
    // 如果配置了 endpoint，则用 AWS SDK 连接；否则留空，方法返回空数据
    if (options.endpointUrl && options.accessKey && options.secretKey) {
      this.client = new S3Client({
        region: options.region || 'cn-beijing',
        endpoint: options.endpointUrl,
        credentials: {
          accessKeyId: options.accessKey,
          secretAccessKey: options.secretKey,
        },
        forcePathStyle: true,
      });
    }
  }

  async listFiles(params: { prefix?: string; maxKeys?: number }): Promise<{ keys: string[]; isTruncated: boolean }> {
    if (!this.client || !this.bucket) {
      return { keys: [], isTruncated: false };
    }
    try {
      const cmd = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: params.prefix,
        MaxKeys: params.maxKeys || 100,
      });
      const res: any = await this.client.send(cmd);
      const keys = (res.Contents || []).map((c: any) => c.Key || '');
      return { keys, isTruncated: res.IsTruncated || false };
    } catch (e) {
      console.error('S3 listFiles error:', e);
      return { keys: [], isTruncated: false };
    }
  }

  async fileExists(params: { fileKey: string }): Promise<boolean> {
    if (!this.client || !this.bucket) return false;
    try {
      await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: params.fileKey })
      );
      return true;
    } catch {
      return false;
    }
  }

  async generatePresignedUrl(params: { key: string; expireTime?: number }): Promise<string> {
    if (!this.client || !this.bucket) return '';
    try {
      const cmd: any = new HeadObjectCommand({ Bucket: this.bucket, Key: params.key });
      return await getSignedUrl(this.client, cmd, { expiresIn: params.expireTime || 3600 });
    } catch (e) {
      console.error('S3 generatePresignedUrl error:', e);
      return '';
    }
  }

  async uploadFile(params: { fileContent: Buffer; fileName: string; contentType?: string }): Promise<string> {
    if (!this.client || !this.bucket) return params.fileName;
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: params.fileName,
          Body: params.fileContent,
          ContentType: params.contentType,
        })
      );
      return params.fileName;
    } catch (e) {
      console.error('S3 uploadFile error:', e);
      return params.fileName;
    }
  }

  async deleteFile(params: { fileKey: string }): Promise<boolean> {
    if (!this.client || !this.bucket) return false;
    try {
      await this.client.send(
        new DeleteObjectCommand({ Bucket: this.bucket, Key: params.fileKey })
      );
      return true;
    } catch {
      return false;
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                                 LLMClient                                  */
/* -------------------------------------------------------------------------- */

interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class LLMClient {
  constructor(_config: Config, _headers?: Record<string, string>) {}

  async invoke(messages: LLMMessage[], _options?: { model?: string; temperature?: number }) {
    // 兼容层：未配置真实 LLM 时返回默认内容
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    return {
      content: lastUser?.content || '（兼容层默认回复）AI 服务未配置，请在 Coze 环境中运行或配置 API Key。',
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                FetchClient                                 */
/* -------------------------------------------------------------------------- */

export class FetchClient {
  constructor(_config: Config, _headers?: Record<string, string>) {}

  async fetch(url: string) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      return {
        status_code: 0,
        status_message: 'success',
        title: new URL(url).hostname,
        content: text,
        url,
        filetype: 'html',
      };
    } catch (e) {
      return {
        status_code: -1,
        status_message: (e as Error).message,
        title: '',
        content: '',
        url,
        filetype: '',
      };
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               SearchClient                                 */
/* -------------------------------------------------------------------------- */

export interface SearchWebItem {
  title: string;
  url: string;
  snippet: string;
  site_name: string;
  publish_time: string;
}

export class SearchClient {
  constructor(_config: Config, _headers?: Record<string, string>) {}

  async webSearch(query: string, count = 10, _needSummary = true): Promise<{
    summary: string;
    web_items: SearchWebItem[];
  }> {
    // 兼容层：未配置搜索服务时返回空结果
    return {
      summary: `（兼容层）关于"${query}"的搜索结果摘要未配置。`,
      web_items: [],
    };
  }
}
