import { Component, OnInit } from '@angular/core';
import { GlobleService } from '../globle.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  user: any = [];
  constructor(
              public gs:GlobleService,
              public router: Router  
            ){ }

  ngOnInit(){
  
    this.gs.getApi().subscribe((res:any) => {
      this.user = res;
      console.log("data",this.user);
    })

  }

  gotoOrder_page(){
     this.router.navigate(["/order"]);
  }

// user id pass
  upadteuser(user:any){
    this.router.navigate(['/order'], 
      {queryParams: { user : JSON.stringify(user) } } )
  }

  userdelete(id:any){
       this.gs.deleteApi(id).subscribe((res:any)=>{
          if(res){
            this.user = this.user.filter((i: any) => i.id !== id);
          } else {
            console.log('error');
          }
       })
  }
  getTotalAmount() {
    return this.user.reduce((total: any, use: { amount: any; }) => total + use.amount, 0);
  }

}
