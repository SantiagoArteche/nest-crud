import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { Car } from "./interfaces/car.interface";
import { Uuid } from "src/config/uuid.adapter";
import { CreateCarDTO } from "./dto/create-car.dto";
import { UpdateCarDTO } from "./dto/update-car.dto";

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: Uuid(),
      name: "Toyota",
      model: "Corolla",
    },
    {
      id: Uuid(),
      name: "Honda",
      model: "Civic",
    },
    {
      id: Uuid(),
      name: "Chevrolet",
      model: "Cruze",
    },
  ];

  public findAll(): Car[] {
    return this.cars;
  }

  public findById(id: string) {
    const findCar = this.cars.find((car) => car.id === id);

    if (!findCar) throw new NotFoundException(`Car with id ${id} not found`);

    return findCar;
  }

  public findByName(name: string): Car | Error {
    const findCar = this.cars.find(
      (car) => car.name.toLowerCase() === name.toLowerCase()
    );

    if (!findCar)
      throw new NotFoundException(`Car with name ${name} not found`);

    return findCar;
  }

  public create(createCarDto: CreateCarDTO): Car[] {
    const { name, model } = createCarDto;
    const sameNameAndModel = this.cars.find((car) => {
      return car.name === name && car.model === model;
    });

    if (sameNameAndModel) throw new BadRequestException(`Car already exists`);

    this.cars.push({ id: Uuid(), name, model });

    return this.cars;
  }

  public updateById(id: string, updateCarDto: UpdateCarDTO): Car | Error {
    let carDB = this.findById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  public deleteById(id: string): Car[] | Error {
    this.findById(id);

    return (this.cars = this.cars.filter((car) => car.id !== id));
  }
}
