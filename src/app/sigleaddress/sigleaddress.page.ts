import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sigleaddress',
  templateUrl: './sigleaddress.page.html',
  styleUrls: ['./sigleaddress.page.scss'],
})
export class SigleaddressPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 
   
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const value = params['adrress_id'];
      console.log(value); // Should log '1'
    });
  }


  backbutton(){
    this.router.navigateByUrl('/listadrress');
  }


  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
