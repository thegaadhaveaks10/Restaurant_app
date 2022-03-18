import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant-dash_model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurentModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  addBtn!:boolean;
  updateBtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
        name: [''],
        email: [''],
        mobile: [''],
        address: [''],
        services: ['']
      });
      this.getAllData();
  }

  clickAddResto(){
    this.getAllData();
    this.addBtn = true;
    this.updateBtn = false;
  }

  //Now we will subscribe to our data which is mapped via services
  addResto(){
    //Initiallizing form values with resraurant model object
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant record added successfully");

      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData(); //when you post any data if we use this it will not refresh the page i will show data right away
    },
    err => {
      alert("Error occured");
    }
)}

getAllData(){
  this.api.getRestaurant().subscribe(res=>{
    this.allRestaurantData = res;
  } )
}

 deleteResto(data:any){
   this.api.deleteRestaurant(data.id).subscribe(res=>{
     alert("Restaurant data has been deleted");
     this.getAllData();
   })
 }

onEditResto(data:any){
    this.addBtn = false;
    this.updateBtn = true;

  this.restaurentModelObj.id = data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
}

updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurant record updated succesfully");

      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    })

}

}
