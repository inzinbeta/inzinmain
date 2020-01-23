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
import { Select2OptionData } from 'ng2-select2';
declare var $: any;
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  displayedColumns = ['imagelogo','imagesidebar','name', 'metatitle','heading','brands','description','keywords','isParent','edit','delete'];
  //users:UserModel[]=[{username:"hello",password:"Hello",name:"Logan"}];
  dataSource: MatTableDataSource<CategoryModel>;
  categoryForm:FormGroup;
  public contactList: FormArray;
  email = new FormControl('', [Validators.required, Validators.email]);
  username=new FormControl('', [Validators.required]);
  password=new FormControl('', [Validators.required]);
  name=new FormControl('', [Validators.required]);
  errors:any={};
  spinner:boolean=true;
  isParent:boolean=false;
  parentCategories:string[]=["home","menu"];
  selectedFilelogo=null;
  selectedFilesidebar=null;
  iconpath=environment.path;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedbrand:string[]=[];
  brands=[{
    id: 'multiple1',
    text: 'Multiple 1'
  },
  {
    id: 'multiple2',
    text: 'Multiple 2'
  },
  {
    id: 'multiple3',
    text: 'Multiple 3'
  },
  {
    id: 'multiple4',
    text: 'Multiple 4'
  }]
  /**
   * editor config
   * 
   */
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '800',
      minHeight: '900',
      maxHeight: '900',
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
 
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic','insertVideo','insertImage'],
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
      height: '500px',
     width: '700px',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }


  editData(row)
  {

  //  console.log(row.brands);
    const dialogRef = this.dialog.open(this.edittemplate, {
      height: '500px',
      width: '700px',
    
    });

   
    // seeting the form values accordingly except username
    this.f.name.setValue(row.name);
    this.f.metatitle.setValue(row.metatitle);
    this.f.heading.setValue(row.heading);
    //this.f.seo_slug.setValue(row.seo_slug);
    this.f.description.setValue(row.description);
    this.f.content.setValue(row.content);
    this.f.keywords.setValue(row.keywords);
    //this.f.isParent(row.isParent);
    this.f.parentcategory.setValue(row.parentcategory);
    this.value = row.brands
    dialogRef.afterClosed().subscribe(result => {
      this.categoryForm.reset();
      this.value=[];
     
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
   //console.log(this.selectedbrand);
 
      if(this.selectedFilelogo && this.selectedFilesidebar && this.selectedbrand.length>0)
      {
   
        const fd=new FormData();
        let file_ext=this.selectedFilelogo.name.split(".");
        let file_extt=this.selectedFilesidebar.name.split(".");
        fd.append('imagelogo',this.selectedFilelogo,`categoryicon.${file_ext[1]}`);
        fd.append('imagesidebar',this.selectedFilesidebar,`categoryicon.${file_extt[1]}`);
        fd.append('name',this.f.name.value);
        fd.append('metatitle',this.f.metatitle.value);
        fd.append('heading',this.f.heading.value);
        fd.append('brands',this.selectedbrand.join(","));
        fd.append('description',this.f.description.value);
        fd.append('keywords',this.f.keywords.value);
       
        fd.append('content',this.f.content.value);
        if(this.f.parentcategory.value)
        {
          fd.append('isParent',"no");
        }
        else{
          fd.append('isParent',"yes");
        }
        fd.append('parentcategory',this.f.parentcategory.value);
       console.log(fd);
       
        this.adminservice.saveCategory(fd).subscribe(data=>{
          this.openSnackBar(data["message"]);
          this.closeDialog();
          this.getAllCategories();
          //console.log(data["message"]);
        })
      }

      else{
        this.openSnackBar("Please Fill All the Fields");
      }
  
  
     
        
        
  }



  onEdit()
  {
   //console.log(this.selectedbrand);
 
      if(this.selectedFilelogo && this.selectedFilesidebar && this.selectedbrand.length>0)
      {
   
        const fd=new FormData();
        let file_ext=this.selectedFilelogo.name.split(".");
        let file_extt=this.selectedFilesidebar.name.split(".");
        fd.append('imagelogo',this.selectedFilelogo,`categoryicon.${file_ext[1]}`);
        fd.append('imagesidebar',this.selectedFilesidebar,`categoryicon.${file_extt[1]}`);
        fd.append('name',this.f.name.value);
        fd.append('metatitle',this.f.metatitle.value);
        fd.append('heading',this.f.heading.value);
        fd.append('brands',this.selectedbrand.join(","));
        fd.append('description',this.f.description.value);
        fd.append('keywords',this.f.keywords.value);
       
        fd.append('content',this.f.content.value);
        if(this.f.parentcategory.value)
        {
          fd.append('isParent',"no");
        }
        else{
          fd.append('isParent',"yes");
        }
        fd.append('parentcategory',this.f.parentcategory.value);
       console.log(fd);
       
        this.adminservice.saveCategory(fd).subscribe(data=>{
          this.openSnackBar(data["message"]);
          this.closeDialog();
          this.getAllCategories();
          //console.log(data["message"]);
        })
      }

      else{
        this.openSnackBar("Please Fill All the Fields");
      }
  
  
     
        
        
  }

  getParentCategories()
  {
    this.adminservice.getParentCategory().subscribe(data=>{
      console.log("cate",data["categories"]);
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
    this.selectedFilelogo=<File>event.target.files[0];
  }

  onFileSelectedside(event)
  {
    this.selectedFilesidebar=<File>event.target.files[0];
  }
  // for multiselect
  changed(data)
  {
this.selectedbrand=data.value;
  }

ngOnInit()
{
  //$('.dropify').dropify({}); 
  this.getParentCategories();
  this.getAllCategories();
  this.categoryForm = this.formBuilder.group({
   name:["",Validators.required],
   metatitle:[""],
   heading:[""],
   brands:[""],
   description:[""],
   content:[""],
   keywords:[""],
   parentcategory:[""]
   
 });

 this.exampleData = [
  {
    id: 'multiple1',
    text: 'Multiple 1'
  },
  {
    id: 'multiple2',
    text: 'Multiple 2'
  },
  {
    id: 'multiple3',
    text: 'Multiple 3'
  },
  {
    id: 'multiple4',
    text: 'Multiple 4'
  }
];

//this.value = ['multiple2', 'multiple4'];

this.options = {
  multiple: true
}

}

}
