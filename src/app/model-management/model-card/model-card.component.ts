import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.css']
})
export class ModelCardComponent implements OnInit {

  constructor(private router: Router, private modelService: ModelService) { }

  ngOnInit(): void {
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
