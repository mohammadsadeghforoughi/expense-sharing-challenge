import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Balance, Expense } from './expense.entity';
import { ExpensesService } from './expenses.service';

@ApiTags('expenses')
@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('expenses')
  @ApiOperation({ summary: 'List all expenses, newest first' })
  @ApiOkResponse({ type: [Expense] })
  findAll() {
    return this.expensesService.findAll();
  }

  @Post('expenses')
  @ApiOperation({ summary: 'Create a directional expense' })
  @ApiCreatedResponse({ type: Expense })
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.create(dto);
  }

  @Delete('expenses')
  @ApiOperation({ summary: 'Delete all expenses while preserving seeded users' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: { deletedCount: { type: 'number', example: 5 } },
    },
  })
  clear() {
    return this.expensesService.clear();
  }

  @Get('balances')
  @ApiTags('balances')
  @ApiOperation({ summary: 'List simplified settlements across all users' })
  @ApiOkResponse({ type: [Balance] })
  balances() {
    return this.expensesService.getBalances();
  }
}
