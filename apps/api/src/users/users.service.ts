import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.entity';

type UserRow = {
  id: string;
  name: string;
  initials: string;
  color: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  findAll(): User[] {
    return this.database.db
      .prepare('SELECT id, name, initials, color FROM users ORDER BY name')
      .all() as UserRow[];
  }
}
