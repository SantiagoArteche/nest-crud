import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDTO } from "./dto/create-car.dto";
import { UpdateCarDTO } from "./dto/update-car.dto";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  public getAllCars() {
    return this.carsService.findAll();
  }

  @Get("/id/:id")
  public getCarById(@Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.findById(id);
  }

  @Get("/name/:name")
  public getCarByName(@Param("name") name: string) {
    return this.carsService.findByName(name);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public createCart(@Body() createCarDto: CreateCarDTO) {
    return this.carsService.create(createCarDto);
  }

  @Put("/id/:id")
  public updateCarById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDTO
  ) {
    return this.carsService.updateById(id, updateCarDto);
  }

  @Delete("/id/:id")
  public deleteCarById(@Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.deleteById(id);
  }
}
