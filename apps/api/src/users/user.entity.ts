import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 'alice' })
  id!: string;

  @ApiProperty({ example: 'Alice' })
  name!: string;

  @ApiProperty({ example: 'AL' })
  initials!: string;

  @ApiProperty({ example: '#FF7A64' })
  color!: string;
}
