import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

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
