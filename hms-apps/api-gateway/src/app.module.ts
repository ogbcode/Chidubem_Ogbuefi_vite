/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { PatientsModule } from './patients/patients.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join} from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // Default PostgreSQL port
      username: 'ogb',
      password: 'admin',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({rootPath: join(__dirname, '../../..', 'users-demo-frontend','dist'),}),
            EmployeesModule, PatientsModule, ClinicsModule, PharmaciesModule, AuthModule, UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}