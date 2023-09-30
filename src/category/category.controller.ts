import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('add')
  @ApiOperation({summary: 'Create New Category', description:'',})
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ status: 201, description: 'The Category has been successfully created.'})  
  @ApiResponse({ status: 400, description: 'Category already exist.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Categories', description:'',})
  @ApiResponse({ status: 201, description: 'Give all the Categories.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:name')
  @ApiOperation({summary: 'Obtain Category id by Name', description:'',})
  @ApiParam({ name: 'name', description: 'Enter the name of the category' })
  @ApiOkResponse({ status: 200,  description: 'The found record', type: Category })
  @ApiResponse({ status: 403,  description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not found'})
  async findByName(@Param('name') name: string):Promise<Category> {
    return this.categoryService.findOneByName(name);
  }

  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain Category by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'categoryId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Category})
  @ApiResponse({  status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Category> {
    return this.categoryService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/:id/edit')
  @ApiOperation({summary: 'Change Category by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'categoryId'})
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({  status: 200, description: 'The record has been successfully modifier.' })  
  @ApiResponse({  status: 404, description: 'Forbidden change.' })
  update( @Param('id',ParseIntPipe) id: number, 
          @Body() updateCategoryDto: UpdateCategoryDto
        ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  @ApiOperation({summary: 'Delete Category by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'userId' })
  @ApiResponse({  status: 201,
                  description: 'The record has been successfully deleted.'
              })  
  @ApiResponse({  status: 403,
                  description: 'Forbidden.' 
              }) 
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
