import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

export interface Cars {
  id?: number;
  name: string;
  model: string;
}

@Injectable()
export class CarsService {
  private cars: Cars[] = [
    {
      id: 1,
      name: "Toyota",
      model: "Corolla",
    },
    {
      id: 2,
      name: "Honda",
      model: "Civic",
    },
    {
      id: 3,
      name: "Chevrolet",
      model: "Cruze",
    },
  ];

  public findAll(): Cars[] {
    return this.cars;
  }

  public findById(id: number): Cars | Error {
    const findCar = this.cars.find((car) => car.id === id);

    if (!findCar) throw new NotFoundException(`Car with id ${id} not found`);

    return findCar;
  }

  public findByName(name: string): Cars | Error {
    const findCar = this.cars.find(
      (car) => car.name.toLowerCase() === name.toLowerCase()
    );

    if (!findCar)
      throw new NotFoundException(`Car with name ${name} not found`);

    return findCar;
  }

  public create({ name, model }: Cars) {
    if (!name && !model)
      throw new BadRequestException(`Name and model are required`);

    this.cars.push({ id: this.cars.length + 1, name, model });

    return this.cars;
  }

  public updateById(id: number, { name, model }: Cars): Cars | Error {
    const findCar = this.cars.find((car) => car.id === id);

    if (!findCar) throw new NotFoundException(`Car with id ${id} not found`);

    findCar.name = name?.length > 0 ? name : findCar.name;
    findCar.model = model?.length > 0 ? model : findCar.model;

    return findCar;
  }

  public deleteById(id: number): Cars[] | Error {
    const findCar = this.cars.find((car) => car.id === id);

    if (!findCar) throw new NotFoundException(`Car with id ${id} not found`);

    return (this.cars = this.cars.filter((car) => car.id !== id));
  }
}
