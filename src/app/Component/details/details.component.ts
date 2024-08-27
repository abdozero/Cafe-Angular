import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';

import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {}
