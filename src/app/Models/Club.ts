/*
A FOOTBALL CLUB WHICH A PLAYER BELONGS TO
*/
export class Club {
  constructor(id: number, logo: string, name: string) {
    this.id = id;
    this.logo = logo;
    this.name = name;
  }
  
  id: number;
  logo: string;
  name: string;
}