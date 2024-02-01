import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import {ConfigModule} from '@nestjs/config'
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //Configure environment variables access
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal:true
    }),
    //Configure Mongoose
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
