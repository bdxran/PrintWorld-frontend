import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
