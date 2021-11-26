import { IDish } from './../../services/menu.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Input() menuListDishes: IDish[] = [];
  @Output() menuListEdit = new EventEmitter();
  @Output() menuListDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
