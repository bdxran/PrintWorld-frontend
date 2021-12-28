import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-model-modify',
  templateUrl: './model-modify.component.html',
  styleUrls: ['./model-modify.component.css']
})
export class ModelModifyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }
}
