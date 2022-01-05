import { Injectable } from '@angular/core';

export class SubCategory {
  private id: number | undefined;
  private name: string | undefined;
  private parentId: number | undefined;

  constructor(id?: number, name?: string, parentId?: number) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor() { }
}
