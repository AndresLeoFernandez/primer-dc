import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
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
  @ApiOperation({summary: 'Create new category', description:'',})
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ status: 201, description: 'The Category has been successfully created.'})  
  @ApiResponse({ status: 400, description: 'Category already exist.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('view/all')
  @ApiOperation({summary: 'Get all raw categories', description:'',})
  @ApiResponse({ status: 201, description: 'Give all the Categories.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:name')
  @ApiOperation({summary: 'Get category by name', description:'',})
  @ApiParam({ name: 'name', description: 'Enter the name of the category' })
  @ApiOkResponse({ status: 200,  description: 'The found record', type: Category })
  @ApiResponse({ status: 403,  description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Category not found'})
  async findByName(@Param('name') name: string):Promise<Category> {
    return this.categoryService.findOneByName(name);
  }

  @Get('/:id/view')
  @ApiOperation({summary: 'Get category by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'categoryId' })
  @ApiResponse({  status: 200, description: 'The found record', type: Category})
  @ApiResponse({  status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Category> {
    return this.categoryService.findOne(id);
  }

}
