import { Component } from '@angular/core';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-q-and-a',
  standalone: true,
  imports: [],
  templateUrl: './q-and-a.component.html',
  styleUrl: './q-and-a.component.css'
})
export class QAndAComponent {
  constructor(private commonVariables: CommonVariablesService){}
  ngOnInit() {
    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
    });
  }

  BrandName: string = '';
}
