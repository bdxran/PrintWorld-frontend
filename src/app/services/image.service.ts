import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app-constants";

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

  constructor(private http: HttpClient) { }

  public uploadImage(formData: FormData) {
    return this.http.post<String>(`${API_URL}/image/upload`, formData);
  }
}
