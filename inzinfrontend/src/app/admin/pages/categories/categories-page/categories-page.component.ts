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
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

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
   
 

  
  
     const fd=new FormData();
     let file_ext=this.selectedFile.name.split(".");
     fd.append('image',this.selectedFile,`categoryicon.${file_ext[1]}`);
     fd.append('category_name',this.f.maincategory.value);
     fd.append('seo_title',this.f.seo_title.value);
     fd.append('seo_heading',this.f.seo_heading.value);
     fd.append('seo_slug',this.f.seo_slug.value);
     fd.append('seo_category_Description',this.f.seo_category_Description.value);
     fd.append('seo_keywords',this.f. seo_keyword.value);
     fd.append('isParent',this.f.isParent.value);
     fd.append('parentCategory',this.f.parentCategory.value);

    
     this.adminservice.saveCategory(fd).subscribe(data=>{
       this.openSnackBar(data["message"]);
       this.closeDialog();
       this.getAllCategories();
       //console.log(data["message"]);
     })
        
        
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
  this.categoryForm = this.formBuilder.group({
   maincategory:["",Validators.required],
   seo_title:[""],
   seo_heading:[""],
   seo_slug:[""],
   seo_category_Description:[""],
   page_content:[""],
   seo_keyword:[""],
   isParent:[""],
   parentCategory:[""]
   
 });

//

 
}

}
