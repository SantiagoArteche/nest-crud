import { IsString, MinLength } from "class-validator";

export class CreateCarDTO {
  @IsString()
  @MinLength(2)
  public readonly name: string;

  @IsString()
  @MinLength(2)
  public readonly model: string;
}
