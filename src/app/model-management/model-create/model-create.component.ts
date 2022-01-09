import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../services/category.service";
import {SubCategory} from "../../services/sub-category.service";

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {

  public categories: Category[] = [
    // @ts-ignore
    {id: 0, name:"Object"},
    // @ts-ignore
    {id: 1, name:"Object1"},
    // @ts-ignore
    {id: 2, name:"Object2"},
    // @ts-ignore
    {id: 3, name:"Object3"}
  ];

  public subCategories: SubCategory[] = [
    // @ts-ignore
    {id: 0, name:"Object"},
    // @ts-ignore
    {id: 1, name:"Object1"},
    // @ts-ignore
    {id: 2, name:"Object2"},
    // @ts-ignore
    {id: 3, name:"Object3"}
  ];

  public images : string[] = [];
  public photoSource : FileList;
  public modelForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    numberElement: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    zip: new FormControl(),
    photoFile: new FormControl()
  })

  constructor(private router: Router, private modelService: ModelService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.modelForm.patchValue({
      zip: file
    });
    this.modelForm.get('zip').updateValueAndValidity()
  }

  get formValue(){
    return this.modelForm.controls;
  }

  onFileChange(event: Event) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      this.photoSource = (event.target as HTMLInputElement).files;
      var filesAmount = (event.target as HTMLInputElement).files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          // Push Base64 string
          this.images.push(event.target.result);
          this.patchValues();
        }
        reader.readAsDataURL((event.target as HTMLInputElement).files[i]);
      }
    }
  }

  // Patch form Values
  patchValues(){
    this.modelForm.patchValue({
      photoFile: this.photoSource
    });
    this.modelForm.get('photoFile').updateValueAndValidity()
  }

  // Remove Image
  removeImage(){
    this.images = [];
    this.photoSource = undefined;
    this.patchValues();
  }

  public createModel() {
    console.log("Create Model")
    let model = new Model(undefined, this.modelForm.get("name").value, this.modelForm.get("description").value,
      undefined, undefined, this.modelForm.get("numberElement").value, undefined, undefined, this.modelForm.get("category").value, this.modelForm.get("subCategory").value)
    let modelJson = JSON.stringify(model)
    var formData: any = new FormData();

    formData.append("file", this.modelForm.get("zip").value);
    for (let i = 0; i < this.modelForm.get("photoFile").value.length; i++) {
      formData.append("images", this.modelForm.get("photoFile").value.item(i));
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
