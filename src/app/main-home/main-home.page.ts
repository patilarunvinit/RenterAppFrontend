import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.page.html',
  styleUrls: ['./main-home.page.scss'],
})
export class MainHomePage implements OnInit {


  constructor() {}
  


  ngOnInit() {
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  dp:string="assets/img/test1.jpg"
  all_flats:string="assets/img/all_flats.png"
  manage:string="assets/img/manage.png"
  rent:string="assets/img/rent.png"
  remain:string="assets/img/remain.png"
  add_renter:string="assets/img/add_renter.png"
  add_home:string="assets/img/add_home.png"

  
}
