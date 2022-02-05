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

  private modelsJson: any;
  public models: Array<Model> = [{}] as Array<Model>;
  public numberPage: number;
  public indexPage: number;

  constructor(private router: Router, private modelService: ModelService) {
  }

  ngOnInit(): void {
    this.indexPage = 0;
    this.getModelForPage(this.indexPage);
  }

  public getModelForPage(index: number) {
    console.log("load page : " + index);
    this.modelService.findAllModel(index, 4).subscribe(
      modelResponse => {
        this.modelsJson = JSON.stringify(modelResponse);
        this.modelsJson = JSON.parse(this.modelsJson);
        this.models = this.modelsJson["data"];
        this.numberPage = Number(this.modelsJson["totalPages"]);
      }
    )
  }

  public counter(i: number) {
    return new Array(i);
  }

  public getPage(index: number) {
    this.indexPage = index;
    this.getModelForPage(this.indexPage)
    console.log(this.indexPage);
  }

  public getPreviewPage() {
    if (this.indexPage > 0) {
      this.indexPage--;
    }
    this.getModelForPage(this.indexPage)
    console.log(this.indexPage);
  }

  public getNextPage() {
    if (this.indexPage < this.numberPage - 1) {
      this.indexPage++;
    }
    this.getModelForPage(this.indexPage)
    console.log(this.indexPage);
  }

  public deleteModel(id: string) {
    console.log("Delete model : " + id);
    this.modelService.deleteModel(id).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }

  public navigate(direction: any, id: any) {
    if (id != undefined) {
      this.router.navigate([direction, id]);
    } else {
      this.router.navigate([direction]);
    }
  }

}
