import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCarDTO {
  @IsUUID()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  public readonly name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  public readonly model?: string;
}
