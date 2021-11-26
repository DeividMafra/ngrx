import { IDish, MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  public menuForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
  });

  public dishes: IDish[] = [];
  private editableDishId: number;

  public buttonLabel: string = 'Add';

  constructor(private service: MenuService) { }

  ngOnInit(): void {

    this.getDishes();

  }

  onSubmit = ()=>{

    if (!this.editableDishId) {
      this.service.createDish(this.menuForm.value).subscribe(
        () => this.getDishes()
      );
    }else{
      const editableDish: IDish = Object.assign(this.menuForm.value, {id: this.editableDishId});
      this.service.updateDish(editableDish).subscribe(
        () => this.getDishes()
      );
    };

    this.clearForm();

  }

  getDishes = () =>{
    this.service.getDishes().subscribe(
     response => this.dishes = response
    );
  }

  selectDish = (dish: IDish) =>{

    console.log('we are here!')

    const {id, name, ingredients} = dish;
    this.editableDishId = id;

    const editableDish: Omit<IDish, 'id'> = {name, ingredients};
    this.menuForm.setValue({...editableDish});

    this.buttonLabel = 'Update';
  }

  clearForm = () =>{
    this.menuForm.reset();
    this.editableDishId = null;
    this.buttonLabel = 'Add';
  }

  remeveDish = (id: number) =>{
    this.service.deleteDish(id).subscribe(
      () => this.getDishes()
    )
  }
}
