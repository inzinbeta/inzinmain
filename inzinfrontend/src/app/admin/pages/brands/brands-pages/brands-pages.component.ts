import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserModel } from 'src/app/admin/pages/shared/models/UserModel';
import { AdminserviceService } from '../../shared/services/adminservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CategoryModel } from '../../shared/models/CategoryModel';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-brands-pages',
  templateUrl: './brands-pages.component.html',
  styleUrls: ['./brands-pages.component.css']
})
export class BrandsPagesComponent implements OnInit {

  displayedColumns = ['photo_icon','category_name', 'seo_title','seo_heading','seo_slug','seo_category_Description','seo_keywords','isParent'];
  //users:UserModel[]=[{username:"hello",password:"Hello",name:"Logan"}];
  dataSource: MatTableDataSource<CategoryModel>;
  categoryForm:FormGroup;
  public contactList: FormArray;
  email = new FormControl('', [Validators.required, Validators.email]);
  username=new FormControl('', [Validators.required]);
  password=new FormControl('', [Validators.required]);
  name=new FormControl('', [Validators.required]);
  errors:any={};
  spinner:boolean=false;
  isParent:boolean=false;
  parentCategories:string[]=["home","menu"];
  selectedFile=null;
  iconpath=environment.path;
  state_all_data=[];
  states=[];
  districts=[];
 
  

  @ViewChild(MatPaginator,{"static":false}) paginator: MatPaginator;
  @ViewChild(MatSort,{"static":false}) sort: MatSort;
  @ViewChild('dialog',{"static":false}) template: TemplateRef<HTMLElement>;
  constructor( private adminservice:AdminserviceService,private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder: FormBuilder) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // convenience getter for easy access to form fields
get f() { return this.categoryForm.controls; }

openSnackBar(message:string) {
  let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
   
  this._snackBar.open(message, 'Close',config);
}
  openDialog(): void {
    const dialogRef = this.dialog.open(this.template, {
      height: '400px',
     width: '600px',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }


  linkImg(fileName) {
    let file=fileName.split("/")[1];
    // base_URL returns localhost:3000 or the production URL
        return `http://localhost:3900/${file}`;
      }
  closeDialog(){
    this.dialog.closeAll();
  }

  parentTrue(event)
  {
    if(event.checked)
    {
      this.isParent=true;
    }
    else{
      this.isParent=false;
    }
  }
 

  // Submitting the form to register the users

  onSubmit()
  {
   
 
      if(this.selectedFile)
      {
        const fd=new FormData();
        let file_ext=this.selectedFile.name.split(".");
        fd.append('brand_img',this.selectedFile,`categoryicon.${file_ext[1]}`);
        fd.append('seo_title',this.f.seo_title.value);
        fd.append('seo_heading',this.f.seo_heading.value);
        fd.append('seo_slug',this.f.seo_slug.value);
        fd.append('seo_description',this.f.seo_category_Description.value);
        fd.append('seo_keywords',this.f. seo_keyword.value);
        fd.append('parentCategory',this.f.parentCategory.value);
        fd.append('states',this.f.states.value);
        fd.append('districts',this.f.districts.value);
        fd.append('investments',this.f.investments.value);
        fd.append('business_exp',this.f.business_exp.value);
        fd.append('sizes',this.f.sizes.value);
        fd.append('brand',this.f.brand.value);


     
       
        this.adminservice.saveCategory(fd).subscribe(data=>{
          this.openSnackBar(data["message"]);
          this.closeDialog();
          this.getAllCategories();
          //console.log(data["message"]);
        })
      }

      else{
        this.openSnackBar("Please Select the icon!!");
      }
  
  
     
        
        
  }

  getStates()
  {
    this.adminservice.getAllStates().subscribe(data=>{
     this.states=data["states"].map(({state})=>state);
     this.state_all_data=data["states"];

    })
  }

  stateChange(states)
  {
     this.districts=this.state_all_data.filter(({state})=>states.includes(state)).flatMap(({districts})=>districts);
    
  }

  getParentCategories()
  {
    this.adminservice.getParentCategory().subscribe(data=>{
      //console.log("cate",data["categories"]);
      this.parentCategories=data["categories"];

    })
  }

  getAllCategories()
  {

    this.spinner=true;
 
    this.adminservice.getAllCategory().subscribe(data=>{
      this.dataSource = new MatTableDataSource <CategoryModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner=false;
    })
  }
  onFileSelected(event)
  {
    this.selectedFile=<File>event.target.files[0];
  }

  

ngOnInit()
{
  this.getParentCategories();
  this.getAllCategories();
  this.getStates();
  this.categoryForm = this.formBuilder.group({
   seo_title:[""],
   seo_heading:[""],
   seo_slug:[""],
   seo_category_Description:[""],
   page_content:[""],
   seo_keyword:[""],
   parentCategory:[""],
   states:[""],
   districts:[""],
   investments:[""],
   business_exp:[""],
   size:[""],
   brand:[""]
   
 });

//

 
}

}
