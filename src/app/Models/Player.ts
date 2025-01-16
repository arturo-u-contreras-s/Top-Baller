/*
A FOOTBALL PLAYER
*/
export class Player {
  constructor(
    id: number,
    name: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    nationality: string,
    height: string,
    weight: string,
    age: number,
    photo: string,
  ) {
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.nationality = nationality;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.photo = photo;
  }
  
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  nationality: string;
  height: string;
  weight: string;
  age: number;
  photo: string;
}