import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 用 Winston 替换 NestJS 默认 Logger
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // 全局前缀
  app.setGlobalPrefix('api');

  // 跨域
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // 全局参数校验
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(app.get(WINSTON_MODULE_PROVIDER)));

  // Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('Tech Blog API')
    .setDescription('博客后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
  logger.log(`📖 Swagger docs: http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
