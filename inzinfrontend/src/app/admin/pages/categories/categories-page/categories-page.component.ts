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
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  displayedColumns = ['photo_icon','category_name', 'seo_title','seo_heading','seo_slug','seo_category_Description','seo_keywords','isParent','edit','delete'];
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
 
  /**
   * editor config
   * 
   */

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  

  @ViewChild(MatPaginator,{"static":false}) paginator: MatPaginator;
  @ViewChild(MatSort,{"static":false}) sort: MatSort;
  @ViewChild('dialog',{"static":false}) template: TemplateRef<HTMLElement>;
  @ViewChild('editdialog',{"static":false}) edittemplate: TemplateRef<HTMLElement>;
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
      height: '800px',
     width: '400px',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }


  editData(row)
  {

    
    const dialogRef = this.dialog.open(this.edittemplate, {
      height: '400px',
     width: '600px',
    
    });

   
    // seeting the form values accordingly except username
    this.f.maincategory.setValue(row.category_name);
    this.f.seo_title.setValue(row.seo_title);
    this.f.seo_heading.setValue(row.seo_heading);
    this.f.seo_slug.setValue(row.seo_slug);
    this.f.seo_category_Description.setValue(row.seo_category_Description);
    this.f.page_content.setValue(row.page_content);
    this.f.seo_keyword.setValue(row.seo_keywords);
    //this.f.isParent(row.isParent);
    this.f.parentCategory.setValue(row.parentCategory);
    
    dialogRef.afterClosed().subscribe(result => {
      this.categoryForm.reset();
     
    });
  }

  deleteData(row)
  {
    console.log(row);
    let parentcategory;
    if(row.isParent)
    {
    parentcategory=null;
    }
    this.adminservice.deleteCategory(row.category_name,parentcategory).subscribe(data=>{
      console.log(data);
      this.getAllCategories();
    })

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
        fd.append('image',this.selectedFile,`categoryicon.${file_ext[1]}`);
        fd.append('category_name',this.f.maincategory.value);
        fd.append('seo_title',this.f.seo_title.value);
        fd.append('seo_heading',this.f.seo_heading.value);
        fd.append('seo_slug',this.f.seo_slug.value);
        fd.append('seo_category_Description',this.f.seo_category_Description.value);
        fd.append('seo_keywords',this.f. seo_keyword.value);
        fd.append('isParent',this.f.isParent.value);
        fd.append('page_content',this.f.page_content.value);
        fd.append('parentCategory',this.f.parentCategory.value);
   
       
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
      console.log(data);
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
