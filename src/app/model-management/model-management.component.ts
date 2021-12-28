import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-model-management',
  templateUrl: './model-management.component.html',
  styleUrls: ['./model-management.component.css']
})
export class ModelManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(direction: any) {
    this.router.navigate([direction]);
  }

}
