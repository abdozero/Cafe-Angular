import { Component, OnInit } from '@angular/core';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit{

  constructor(private commonVariables: CommonVariablesService){}
  ngOnInit() {
    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
    });
  }

  BrandName: string = '';
}
