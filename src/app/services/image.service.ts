import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app-constants";
import {Observable} from "rxjs";

export class Image {
  private id: string | undefined;
  private name: string | undefined;
  private extension: string | undefined;
  private modelId: string | undefined;

  constructor(id?: string, name?: string, extension?: string, modelId?: string) {
    this.id = id;
    this.name = name;
    this.extension = extension;
    this.modelId = modelId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  public uploadImage(formData: FormData) {
    return this.http.post<String>(`${API_URL}/image/upload`, formData);
  }

  public getImage(id: String) {
    return this.http.get<String[]>(`${API_URL}/image/byId/` + id);
  }

  public getImageIds(idModel: String) {
    return this.http.get<String[]>(`${API_URL}/image/byModelId/` + idModel);
  }

  public downloadImage(id: String) {
    return this.http.get(`${API_URL}/image/download/` + id, {responseType: 'blob'});
  }

  public delete(id: String) {
    return this.http.get(`${API_URL}/image/delete/` + id);
  }
}
