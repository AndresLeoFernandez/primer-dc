import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { Collaborator } from './entities/collaborator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class CollaboratorService {

  constructor(
    @InjectRepository(Collaborator) private readonly collaboratorRepository: Repository<Collaborator>)
    {}
  create(createCollaboratorDto: CreateCollaboratorDto) {
    return 'This action adds a new collaborator';
  }
  async findAll(): Promise<Collaborator[]> {
    return await this.collaboratorRepository.find()
  }

  
  async findOne(id: number): Promise<Collaborator> {
    const criteria : FindOneOptions = {relations:['user','project'], where: { collaboratorId: id } }
    let collaborator = await this.collaboratorRepository.findOne(criteria);
    if (!collaborator)
      throw new NotFoundException('Collaborator does not exists');
    return collaborator;    
  }

  /*update(id: number, updateCollaboratorDto: UpdateCollaboratorDto) {
    return `This action updates a #${id} collaborator`;
  }*/

  async remove(id: number):Promise<Collaborator | null>  {
    const collaborator = await this.findOne(id);
    if (!collaborator) 
      throw new BadRequestException('Collaborator not find');
    return await this.collaboratorRepository.remove(collaborator);
  }
}