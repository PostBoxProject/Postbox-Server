import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { winstonLogger } from './config/logger.config';

async function bootstrap() {  

  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: process.env.NODE_ENV === 'prod' ? ['error', 'warn', 'log'] : ['debug'],  
    logger : winstonLogger
    }  
  );  

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
