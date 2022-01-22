import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../services/category.service";
import {SubCategory} from "../../services/sub-category.service";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {

  public categories: Category[] = [
    // @ts-ignore
    {id: 0, name: "Object"},
    // @ts-ignore
    {id: 1, name: "Object1"},
    // @ts-ignore
    {id: 2, name: "Object2"},
    // @ts-ignore
    {id: 3, name: "Object3"}
  ];
  public subCategories: SubCategory[] = [
    // @ts-ignore
    {id: 0, name: "Object"},
    // @ts-ignore
    {id: 1, name: "Object1"},
    // @ts-ignore
    {id: 2, name: "Object2"},
    // @ts-ignore
    {id: 3, name: "Object3"}
  ];
  public filePaths = new Map();
  public images = new Map();
  public imagesTmp = new Map();
  public index: number = 1;

  public modelForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    numberElement: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    zip: new FormControl(),
    photoFile: new FormControl()
  })

  public imageUpload = new FormGroup({
    img: new FormControl(),
  })

  constructor(private router: Router, private modelService: ModelService,
              public fb: FormBuilder, private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  public imagePreview(event: Event) {
    console.log("Preview image " + this.index);
    const file = (event.target as HTMLInputElement).files[0];

    this.images.set(this.index, file);
    this.imagesTmp.set(this.index, file["name"]);

    this.patchValue(file);

    this.imageUpload.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.set(this.index, reader.result as string);
      this.uploadImage();
      this.index++;
    }
    reader.readAsDataURL(file);
  }

  private patchValue(image: File) {
    this.imageUpload.patchValue({
      img: image
    });
  }

  private uploadImage() {
    console.log("Upload Image")
    var formData: any = new FormData();
    formData.append("image", this.imageUpload.get("img").value);
    let result;

    this.imageService.uploadImage(formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  public counter(index: number) {
    return new Array(index);
  }

  public remove(count: number) {
    console.log("Delete image : " + count);
    this.images.delete(count);
    this.filePaths.delete(count);
    this.imagesTmp.delete(count);
    for (let i = count; i < this.images.size + 1; i++) {
      this.images.set(i, this.images.get(i + 1));
      this.filePaths.set(i, this.filePaths.get(i + 1));
      this.imagesTmp.set(i, this.imagesTmp.get(i + 1));
    }
    this.index--;
  }

  public upload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.modelForm.patchValue({
      zip: file
    });
    this.modelForm.get('zip').updateValueAndValidity()
  }

  get formValue() {
    return this.modelForm.controls;
  }

  public createModel() {
    console.log("Create Model")
    let model = new Model(undefined, this.modelForm.get("name").value, this.modelForm.get("description").value,
      undefined, undefined, this.modelForm.get("numberElement").value, undefined, undefined, this.modelForm.get("category").value, this.modelForm.get("subCategory").value)
    let modelJson = JSON.stringify(model)
    var formData: any = new FormData();

    formData.append("file", this.modelForm.get("zip").value);
    for (let i = 1; i < this.imagesTmp.size + 1; i++) {
      console.log(this.imagesTmp.get(i));
      formData.append("images", this.imagesTmp.get(i));
    }
    formData.append("model", modelJson);

    this.modelService.createModel(formData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
