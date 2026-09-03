import type { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: '请求的资源不存在' });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error && typeof error === 'object' && 'issues' in error) {
    return res.status(400).json({ message: '输入数据校验失败', details: (error as { issues: unknown }).issues });
  }
  console.error(error);
  return res.status(500).json({ message: '服务器处理请求时发生错误' });
}
