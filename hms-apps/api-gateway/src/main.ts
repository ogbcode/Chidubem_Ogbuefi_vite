import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v', //this is actually the default, if not indicated
    //defaultVersion: '1' In case you need a global version tagging where there is no explicitly declared version
    // or
    //defaultVersion: ['1', '2']
    // or
    //defaultVersion: '1' 
  });
  await app.listen(3002);
}
bootstrap();
