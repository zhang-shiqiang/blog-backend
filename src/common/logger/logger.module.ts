import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// 控制台格式（彩色 + 可读）
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, context, stack, ...meta }) => {
    const ctx = context ? `[${context}] ` : '';
    const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} ${level} ${ctx}${message}${extra}${stack ? `\n${stack}` : ''}`;
  }),
);

// 文件格式（JSON 结构化，便于 ELK / Loki 采集）
const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  winston.format.json(),
);

export const LoggerModule = WinstonModule.forRoot({
  transports: [
    // 控制台
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    }),

    // 普通日志（按天滚动，保留 30 天）
    new (winston.transports as any).DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '50m',
      format: fileFormat,
      level: 'info',
    }),

    // 错误日志单独存（保留 90 天）
    new (winston.transports as any).DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '90d',
      maxSize: '20m',
      format: fileFormat,
      level: 'error',
    }),
  ],
});
