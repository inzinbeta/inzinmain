import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { CategoryModel } from '../models/CategoryModel';
import {BrandsModel} from '../models/BrandsModel';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }


 // check for email if its already registered

   checkEmail(email:string)
   {
    return this.http.post(`http://${environment.url}:${environment.port}/admin/checkEmail`,{email:email});

   }

   // check for username if its already registered

   checkUsername(username:string)
   {
    return this.http.post(`http://${environment.url}:${environment.port}/admin/checkUsername`,{usernam:username});

   }

  registerUser(username:string,password:string,role:string,isactive:boolean,name:string,email:string)
  {
    
    return this.http.post(`http://${environment.url}:${environment.port}/admin/registeruser`,{username:username,password:password,isactive:isactive,name:name,email:email,role:role});
  
  }
  
  // ge users
  
  getUsers()
  {
    return this.http.post<UserModel[]>(`http://${environment.url}:${environment.port}/admin/getUsers`,{});
  
  }

  deleteUser(username)
  {
    return this.http.post(`http://${environment.url}:${environment.port}/admin/deleteUser`,{username:username});

  }
  editUser(username:string,password:string,role:string,isactive:boolean,name:string,email:string)
  {
    return this.http.post(`http://${environment.url}:${environment.port}/admin/registeruser`,{username:username,password:password,isactive:isactive,name:name,email:email,role:role});

  }

  /*
  Categories Service 
  */
 getParentCategory()
 {
  return this.http.post<string[]>(`http://${environment.url}:${environment.port}/admin/getParentsCategory`,{});

 }

 getAllCategory()
 {
  return this.http.post<CategoryModel[]>(`http://${environment.url}:${environment.port}/admin/getAllCategory`,{});

 }

 saveCategory(formdata)
 {
   console.log("fd",formdata);
  return this.http.post(`http://${environment.url}:${environment.port}/admin/saveCategory`,formdata);

 }


 deleteCategory(category)
 {
   return this.http.post(`http://${environment.url}:${environment.port}/admin/deleteCategory`,category);

 }
 editCategory(formdata)
 {
   return this.http.post(`http://${environment.url}:${environment.port}/admin/updateCategory`,formdata);

 }


/**
 * 
 * Brands Services
 */

getAllBrands()
{
 return this.http.post<BrandsModel[]>(`http://${environment.url}:${environment.port}/admin/getAllBrands`,{});

}


saveBrand(formdata)
{
  console.log("fd",formdata);
 return this.http.post(`http://${environment.url}:${environment.port}/admin/saveBrand`,formdata);

}


deleteBrand(category)
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/deleteBrand`,category);

}
editBrand(formdata)
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/updateBrand`,formdata);

}


/**
 * Premium Brands
 */

getAllPremiumBrands()
{
 return this.http.post<BrandsModel[]>(`http://${environment.url}:${environment.port}/admin/getAllPremiumBrands`,{});

}


savePremiumBrand(formdata)
{
  console.log("fd",formdata);
 return this.http.post(`http://${environment.url}:${environment.port}/admin/savePremiumBrand`,formdata);

}


deletePremiumrand(category)
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/deletePremiumBrand`,category);

}
editPremiumBrand(formdata)
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/updatePremiumBrand`,formdata);

}




 /**
  * States and Districts
  */
 getAllStates()
 {
  return this.http.post(`http://${environment.url}:${environment.port}/admin/getAllStates`,{});

 }

}
