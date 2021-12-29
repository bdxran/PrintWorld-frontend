import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-model-modify',
  templateUrl: './model-modify.component.html',
  styleUrls: ['./model-modify.component.css']
})
export class ModelModifyComponent implements OnInit {

  public modelForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    numberElement: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    zip: new FormControl()
  })

  constructor(private router: Router, private modelService: ModelService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.modelForm.patchValue({
      zip: file
    });
    this.modelForm.get('zip').updateValueAndValidity()
  }

  public createModel() {
    console.log("Modify Model")
    let model = new Model(undefined, this.modelForm.get("name").value, this.modelForm.get("description").value,
      undefined, undefined, this.modelForm.get("numberElement").value, undefined, undefined)
    let modelJson = JSON.stringify(model)
    var formData: any = new FormData();
    formData.append("file", this.modelForm.get("zip").value);
    formData.append("model", modelJson);

    this.modelService.modifyModel(formData).subscribe(
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
