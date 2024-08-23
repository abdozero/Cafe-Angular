import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  BrandName: string = "Brand Name";
  constructor(private commonVariables: CommonVariablesService){}
  ngOnInit() {
    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
    });
  }
}
