import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ShopService } from '../shop.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Confirm } from '../confirm.component';

@Component({
  selector: 'app-header',
  templateUrl: '../templates/header.component.html',
})
export class HeaderComponent implements OnInit, DoCheck {
  changePassForm!: FormGroup;
  id:any;
  id_user:any;
  error:any;
  name:any;
  email:any;
  listCate: any;
  listCart: any;
  listBrand: any;
  listCartByLike: any;
  url: any = environment.url;
  cartSubtotal: number = 0;
  cartSubByLiketotal: number = 0;
  check: any;
  constructor(
    private _AuthService: AuthService,
    private _ShopService: ShopService,
    private _Router: Router,
    ) { 
    }
    
  
  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      'old_password': new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      'new_password': new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      'confirmPassword': new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
    },[Confirm.confirm('new_password', 'confirmPassword')])

      this.check;
    if(this.check){
      this.getAllCart();
      this.getAllCartBylike();
      this.profile();
      
    }
    this.getBrands();
    this.getCategories();
    
  }
  ngDoCheck(): void{
      if(!this.check){
        this.check = this._AuthService.checkAuth();
      }
      if(this.check && !this.name && !this.id_user){
        this.getAllCart();
        this.getAllCartBylike();
        this.profile();
      }
      this.error;
}
get passwordMatchError() {
  return (
    this.changePassForm.getError('mismatch') &&
    this.changePassForm.get('confirmPassword')?.touched
  );
}
  logout() {
    this._AuthService.logout();
    this.check = this._AuthService.checkAuth();
    this.listCartByLike = [];
    this.listCart = [];
    this._Router.navigate(['login']);
  }
  changeCart(){
    this.getAllCart();
    this.getAllCartBylike();
    this.check = this._AuthService.checkAuth();
  }
  getAllCart() {
    this._ShopService.getAllCart().subscribe(res => {
      this.listCart = res;
      this.cartSubtotal = 0;
      for (let cart of this.listCart) {
        this.cartSubtotal += cart.price * cart.quantity;
      }
    });
  }

  getBrands(){
    this._ShopService.brand_list().subscribe(res =>{
      this.listBrand = res;
    })
  }

  getCategories(){
    this._ShopService.cate_list().subscribe(res =>{
      this.listCate = res;
    })
  }
  a(id :any){
    this._Router.navigate(['/product-list/cate/'+id]);
  }
  updateQuantity(id: any, quantity: any) {
    this._ShopService.updateQuantity(id, quantity).subscribe(res => {
      this.getAllCart();
    });
  }
  deleteCart(id: any) {
    this._ShopService.deleteCart(id).subscribe(res => {
      this.getAllCart();
    });
  }
  getAllCartBylike() {
    this._ShopService.getAllCartByLike().subscribe(res => {
      this.listCartByLike = res;
      this.cartSubByLiketotal = 0;
      for (let cartlike of this.listCartByLike) {
        this.cartSubByLiketotal += cartlike.price * cartlike.quantity;
      }
    });
  }
  deleteCartByLike(id: any) {
    this._ShopService.deleteCartByLike(id).subscribe(res => {
      this.getAllCartBylike();
    });
  }
  addToCart(id: number) {
    this._ShopService.addToCart(id).subscribe(res => {
      this._ShopService.getAllCart();
      this.ngOnInit();

      alert('Thêm vào giỏ thành công');
    })
  }
  profile(){
    if(this._AuthService.checkAuth()) {
        this._AuthService.profile().subscribe(res =>{
          this.id_user = res.id;
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
  Submit():void{
    let data = this.changePassForm.value;
    let passwords = {
      old_password:data.old_password,
      new_password:data.new_password,
    }
    this._AuthService.ChangePass(passwords).subscribe(res =>{
      this.error = false;
        alert("Thay đổi mật khẩu thành công")
    }, err => {
      if(err.status === 401) {
        alert("Thay đổi mật khẩu không thành công");
        this.error = true;
      }
    });
  }
}

