import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UserDto {
    @ApiProperty({ example: 'string' })
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty({ example: 'example@mail.com' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '1234' })
    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password?: string;
}
