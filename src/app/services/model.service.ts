import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app-constants";

export class Model {
  private id: string | undefined;
  private name: string | undefined;
  private description: string | undefined;
  private nameFile: string | undefined;
  private extension: string | undefined;
  private numberElement: number | undefined;
  private note: number | undefined;
  private size: number | undefined;

  constructor(id?: string, name?: string, description?: string, nameFile?: string,
              extension?: string, numberElement?: number, note?: number, size?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.nameFile = nameFile;
    this.extension = extension;
    this.numberElement = numberElement;
    this.note = note;
    this.size = size;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) {
  }

  public createModel(model: Model) {
    let modelJson = JSON.stringify(model)
    return this.http.post<any>(`${API_URL}/model/create`, modelJson);
  }
}
