"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(app.get(nest_winston_1.WINSTON_MODULE_PROVIDER)));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tech Blog API')
        .setDescription('博客后台接口文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 4000;
    await app.listen(port);
    logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
    logger.log(`📖 Swagger docs: http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map