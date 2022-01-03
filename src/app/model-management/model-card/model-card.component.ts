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

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
