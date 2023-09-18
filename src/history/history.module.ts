import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from "./entities/history.entity";
import { Document } from "src/document/entities/document.entity";
import { Collaborator } from "src/collaborator/entities/collaborator.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([History,Document,Collaborator])],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
