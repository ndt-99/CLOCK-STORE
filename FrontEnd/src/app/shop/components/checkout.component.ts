import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Order } from '../shop';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-checkout',
  templateUrl: '../templates/checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  form!: FormGroup;
  name:any;
  id:any;
  email:any;
  listCart: any;
  cartSubtotal: number = 0;
  url: any = environment.url;
  listProvince: any;
  listDistrict: any;
  listWard: any;
  provinceSelected: boolean = false;
  districtSelected: boolean = false;
 
  constructor(
    private ShopService: ShopService,
     private _UserService:AuthService,
     private _Router: Router,
     ) {
  }
  
  ngOnInit(): void {
        this.getAllCart();  
        this.profile();  
        this.form = new FormGroup({
          province_id: new FormControl('', Validators.required),
          district_id: new FormControl('', Validators.required),
          ward_id: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          note: new FormControl(''),
          name_customer: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
      })
      this.ShopService.getAllProvince().subscribe(res => {
          this.listProvince = res;
      })

  }
  profile(){
    if(this._UserService.checkAuth()) {
        this._UserService.profile().subscribe(res =>{
          this.id = res.id;
          this.name = res.name;
          this.email = res.email;
        },e=>{
          console.log(e);
        })
    }
    else{
      this._Router.navigate(['/login']);
    }
  }
  checkCart(){
    this.getAllCart();
  }
  getAllCart() {
      this.ShopService.getAllCart().subscribe(res => {
          this.listCart = res;
          this.cartSubtotal = 0;
          for (let cart of this.listCart) {
              this.cartSubtotal += cart.price * cart.quantity;
          }
      });      
  }
  onSelectProvince(event: any) {
      let provinceId = event.target.value;
      this.provinceSelected = true;
      this.districtSelected = false;
      this.ShopService.getAllDistrictByProvinceId(provinceId).subscribe(res => {
          this.listDistrict = res;
      })     
  }
  onSelectDistrict(event: any) {
      let districtId = event.target.value;
      this.districtSelected = true;
      this.ShopService.getAllWardByDistrictById(districtId).subscribe(res => {
          this.listWard = res;
      })
  }
  submit() {
        let order: any;
        let id = this.id;
        let data = this.form.value;
        let Order: Order = {
          province_id:data.province_id,
          district_id:data.district_id,
          ward_id:data.ward_id,
          address:data.address,
          note:data.note,
          name_customer:data.name_customer,
          phone:data.phone,
          customer_id:id,
        }
          this.ShopService.storeOrder(Order).subscribe(res => {
            order = res;
            // console.log(order);
            this._Router.navigate(['order-detail', order.id]);
            // alert('thành công');
              this.getAllCart();
          });
   
  }
 
}
