import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';
import * as packageConfig from '../package.json';
import { HttpExecptionFilter } from './filters/http-execption/http-execption.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  // 数据验证
  app.useGlobalPipes(new ValidationPipe());
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局过滤器
  app.useGlobalFilters(new HttpExecptionFilter());

  // @ts-ignore
  if (import.meta.env.DEV) {
    const options = new DocumentBuilder()
      .setTitle(packageConfig.name)
      .setDescription(packageConfig.description)
      .setVersion(packageConfig.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/doc', app, document);

    return app;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (import.meta.env.PROD) await app.listen(3000);
}

// @ts-ignore
export const viteNodeApp = bootstrap();
