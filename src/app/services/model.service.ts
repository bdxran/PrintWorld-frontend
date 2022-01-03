import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  public findModelById(id: String) {
    return this.http.get<String>(`${API_URL}/model/byid/`+id);
  }

  public findAllModel(page: number, limit: number) {
    return this.http.get<String>(`${API_URL}/model/all`, {params: {page: page, limit:limit}});
  }

  public createModel(formData: FormData) {
    return this.http.post<String>(`${API_URL}/model/create`, formData);
  }

  public modifyModel(formData: FormData) {
    return this.http.post<String>(`${API_URL}/model/modify`, formData);
  }

  public deleteModel(id: string) {
    return this.http.delete<String>(`${API_URL}/model/delete/`+id);
  }
}
