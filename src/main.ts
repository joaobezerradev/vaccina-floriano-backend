import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { DefaultExceptionsFilter } from './commons/filters/default-exception.filter'
import { TransformInterceptor } from './commons/interceptors/transform.interceptor'
import { Validation421Pipe } from './commons/pipes/validation-421.pipe'

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200
  }
  app.enableCors(corsOptions)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalPipes(new Validation421Pipe())
  app.useGlobalFilters(new DefaultExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Vaccine')
    .setDescription('This is our Vaccine API')
    .setVersion('1.0.0')
    .setContact('João Bezerra', 'https://linkedin.com/in/vitorlirab', 'joaobezerra.dev@gmail.com')
    .build()

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  }

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions
  )

  SwaggerModule.setup('api', app, swaggerDocument)

  await app.listen(3333)
}
bootstrap()
