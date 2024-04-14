import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {  

  const app = await NestFactory.create(AppModule, {cors: true});  


  app.enableCors({    
    maxAge: 86400,
  })

  const config = new DocumentBuilder()
    .setTitle('PostBox')
    .setDescription('postbox-api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
