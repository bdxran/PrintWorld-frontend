import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../services/model.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-model-management',
  templateUrl: './model-management.component.html',
  styleUrls: ['./model-management.component.css']
})
export class ModelManagementComponent implements OnInit {

  public modelsJson: any;
  public models: Array<Model>;
  public numberPage: number;

  constructor(private router: Router, private modelService: ModelService) {
  }

  ngOnInit(): void {
    this.modelService.findAllModel(0, 4).subscribe(
      modelResponse => {
        this.modelsJson = JSON.stringify(modelResponse);
        this.modelsJson = JSON.parse(this.modelsJson);
        this.models = this.modelsJson["data"];
        this.numberPage = Number(this.modelsJson["totalPages"]);
      }
    )
  }

  counter(i: number) {
    return new Array(i);
  }

  public getPage(index: number) {
    console.log(index);
  }

  public deleteModel() {
    let model = new Model("m-20211229-000001", "test", "test",
      "test-upload", "zip", 5, 0, 0);
    console.log("Delete model : " + model.getId());
    this.modelService.deleteModel(model).subscribe(
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
