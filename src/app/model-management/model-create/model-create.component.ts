import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Model, ModelService} from "../../services/model.service";

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {

  public model: Model | undefined;
  public name: string = "";
  public description: string = "";
  public numberElement: number = 0;

  constructor(private router: Router, private modelService: ModelService) {
  }

  ngOnInit(): void {
  }

  public createModel() {
    this.model = new Model(undefined, this.name, this.description, undefined, undefined, this.numberElement, undefined, undefined)
    this.modelService.createModel(this.model).subscribe({
      next(data) {
        console.log(data);
      },
      error(error) {
        console.log(error);
      }
    })
    this.router.navigate(['']);
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
