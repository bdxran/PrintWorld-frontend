import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../services/category.service";

@Component({
  selector: 'app-model-modify',
  templateUrl: './model-modify.component.html',
  styleUrls: ['./model-modify.component.css']
})
export class ModelModifyComponent implements OnInit {

  public id: string;
  private modelsJson: any;
  public model: Model;
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

  public modelForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    numberElement: new FormControl(),
    category: new FormControl(),
    subCategory: new FormControl(),
    zip: new FormControl()
  })

  constructor(private router: Router, private routerActive: ActivatedRoute,
              private modelService: ModelService, public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.paramMap.get("id");
    console.log(this.id)

    this.modelService.findModelById(this.id).subscribe(
      data => {
        this.modelsJson = JSON.stringify(data);
        this.model = JSON.parse(this.modelsJson);
        this.modelForm = this.fb.group({
          name: [this.model["name"]],
          description: [this.model["description"]],
          numberElement: [this.model["numberElement"]],
          category: [this.model["categoryId"]],
          subCategory: [this.model["subCategoryIds"]],
        });
      },
      error => {
        console.log(error);
      })
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
