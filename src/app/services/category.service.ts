import { Injectable } from '@angular/core';

export class Category {
  private id: number | undefined;
  private name: string | undefined;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
}
