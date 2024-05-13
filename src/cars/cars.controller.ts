import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { Cars, CarsService } from "./cars.service";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  public getAllCars() {
    return this.carsService.findAll();
  }

  @Get("/id/:id")
  public getCarById(@Param("id", ParseIntPipe) id: number) {
    return this.carsService.findById(id);
  }

  @Get("/name/:name")
  public getCarByName(@Param("name") name: string) {
    return this.carsService.findByName(name);
  }

  @Post()
  public createCart(@Body() { name, model }: Cars) {
    return this.carsService.create({ name, model });
  }

  @Put("/id/:id")
  public updateCarById(
    @Param("id", ParseIntPipe) id: number,
    @Body() { name, model }: Cars
  ) {
    return this.carsService.updateById(id, { name, model });
  }

  @Delete("/id/:id")
  public deleteCarById(@Param("id", ParseIntPipe) id: number) {
    return this.carsService.deleteById(id);
  }
}
