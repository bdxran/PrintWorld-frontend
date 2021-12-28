import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.css']
})
export class ModelCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
