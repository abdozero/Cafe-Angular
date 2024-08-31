import { Component } from '@angular/core';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})
export class TermsOfServiceComponent {

  constructor(private commonVariables: CommonVariablesService){}
  ngOnInit() {
    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
    });
  }

  BrandName: string = '';
}
