import { Component, OnInit } from '@angular/core';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  BrandName: string = "";
  constructor(private commonVariables: CommonVariablesService){}
  ngOnInit() {
    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
    });
  }
}
