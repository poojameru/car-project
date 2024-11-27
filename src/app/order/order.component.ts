import { Component, OnInit } from '@angular/core';
import { GlobleService } from '../globle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  isEdited:boolean = false;
  ngOnInit(){
      this.activerouter.queryParams.subscribe((param: any)=>{

         if(Object.keys(param).length !== 0){

          this.isEdited = true;
           let userparam = JSON.parse(param['user'])
          console.log(">>>>>>", userparam);
          if(userparam){
            this.formobj = {
              foodnm: userparam.foodnm,
              rate: userparam.rate,
              quantity: userparam.quantity,
              amount: userparam.amount,
              id: userparam.id
            }
          }

         }
      })
  }
   
  constructor(public gs:GlobleService,
               public router:Router,
               public activerouter: ActivatedRoute
  ){}
          formobj = {
            foodnm : '',
            rate :0,
            quantity: 0,
            amount: 0,
            id:''
          }
          calculateAmount() {
            if (this.formobj.rate && this.formobj.quantity) {
              this.formobj.amount = this.formobj.rate * this.formobj.quantity;
            } else {
              this.formobj.amount = 0;
            }
          }

          // insert data
          onsubmit(form:any){

            console.log("data order",form.value);
            this.gs.postApi(form.value).subscribe((res:any)=>{
              if(res){
                this.router.navigate(['/home']);
              }else{
                console.log("Error : not found data");
              }
            })
          }

          //upadte data

          update_page(){
             console.log(this.formobj);
            this.gs.updateApi(this.formobj,this.formobj.id).subscribe((res:any)=>{

              if(res){
                this.router.navigate(['/home']);
              } else {
                console.log("Error: not update data");
              }
            })

            
          }

}
