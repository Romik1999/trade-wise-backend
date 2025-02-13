import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../gurds/jwt-auth.guard';

export const auth = () => UseGuards(JwtAuthGuard);
