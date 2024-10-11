import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from '@app/application/logger/custom-logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, {
		logger: new CustomLogger(),
	});
	app.setGlobalPrefix('api');
	const config = new DocumentBuilder()
		.setTitle('Median')
		.setDescription('The Median api description')
		.setVersion('0.1')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);
	await app.listen(8000);
}

bootstrap();
