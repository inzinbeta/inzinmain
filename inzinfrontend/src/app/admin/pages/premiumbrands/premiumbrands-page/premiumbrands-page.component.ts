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
import { BrandsModel } from '../../shared/models/BrandsModel';

@Component({
  selector: 'app-premiumbrands-page',
  templateUrl: './premiumbrands-page.component.html',
  styleUrls: ['./premiumbrands-page.component.css']
})
export class PremiumbrandsPageComponent implements OnInit {

  displayedColumns = ['imagelogo','imagesidebar', 'title','heading','parentcategory','brand','description','keywords','edit','delete'];
  //users:UserModel[]=[{username:"hello",password:"Hello",name:"Logan"}];
  dataSource: MatTableDataSource<BrandsModel>;
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
  selectedFilelogo=null;
  selectedFilesidebar=null;
  iconpath=environment.path;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedbrand:string[]=[];
  previewUrl:any="assets/admin/images/download.jpeg";
  previewurlSide:any="assets/admin/images/download.jpeg";
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
    
    this.f.title.setValue(row.title);
    this.f.heading.setValue(row.heading);
    //this.f.seo_slug.setValue(row.seo_slug);
    this.f.description.setValue(row.description);
    this.f.content.setValue(row.content);
    this.f.keywords.setValue(row.keywords);
    //this.f.isParent(row.isParent);
    this.f.parentcategory.setValue(row.parentcategory);
    this.f.brandcategory.setValue(row.brandcategory);
    this.f.brand.setValue(row.brand);
    dialogRef.afterClosed().subscribe(result => {
      this.categoryForm.reset();
      this.value=[];
      this.selectedFilelogo="assets/admin/images/download.jpeg";
      this.selectedFilesidebar="assets/admin/images/download.jpeg";
     
     
    });
  }

  deleteData(row)
  {
   
    this.adminservice.deleteBrand(row).subscribe(data=>{
      console.log(data);
      this.getAllBrands();
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


 
 
 
      if(this.selectedFilelogo && this.selectedFilesidebar)
      {
   
        const fd=new FormData();
        let file_ext=this.selectedFilelogo.name.split(".");
        //let file_extt=this.selectedFilesidebar.name.split(".");
        fd.append('imagelogo',this.selectedFilelogo,`categoryicon.${file_ext[1]}`);
        //fd.append('imagesidebar',this.selectedFilesidebar,`categoryicon.${file_extt[1]}`);
        fd.append('brand',this.f.brand.value);
        fd.append('description',this.f.description.value);
        fd.append('parentcategory',this.f.parentcategory.value);
        fd.append('cnfname',this.f.cnfname.value);
        fd.append('cnfarea',this.f.cnfarea.value);
        fd.append('cnfinvestment',this.f.cnfinvestmente.value);
        fd.append('cnfteam',this.f.cnfteam.value);
        fd.append('distributorname',this.f.distributorname.value);
        fd.append('distributorarea',this.f.distributorarea.value);
        fd.append('distributorinvestment',this.f.distributorinvestment.value);
        fd.append('distributorteam',this.f.distributorteam.value);
        fd.append('dealername',this.f.dealername.value);
        fd.append('dealerarea',this.f.dealerarea.value);
        fd.append('dealerinvestment',this.f.dealerinvestment.value);
        fd.append('dealerteam',this.f.dealerteam.value);

       console.log(fd);
       
        this.adminservice.saveBrand(fd).subscribe(data=>{
          this.openSnackBar(data["message"]);
          this.closeDialog();
          this.getAllBrands();
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
 
   if(this.selectedFilelogo && this.selectedFilesidebar)
   {

     const fd=new FormData();
     let file_ext=this.selectedFilelogo.name.split(".");
     let file_extt=this.selectedFilesidebar.name.split(".");
     fd.append('imagelogo',this.selectedFilelogo,`categoryicon.${file_ext[1]}`);
     fd.append('imagesidebar',this.selectedFilesidebar,`categoryicon.${file_extt[1]}`);
    
     fd.append('title',this.f.title.value);
     fd.append('heading',this.f.heading.value);
     fd.append('brand',this.f.brand.value);
     fd.append('description',this.f.description.value);
     fd.append('keywords',this.f.keywords.value);
    
     fd.append('content',this.f.content.value);
   
     fd.append('parentcategory',this.f.parentcategory.value);
    console.log(fd);
    
     this.adminservice.editBrand(fd).subscribe(data=>{
       this.openSnackBar(data["message"]);
       this.closeDialog();
       this.getAllBrands();
       //console.log(data["message"]);
     })
   }

   else{
     this.openSnackBar("Please Fill All the Fields");
   }


        
        
  }

  getParentCategories()
  {
    this.adminservice.getAllCategory().subscribe(data=>{
      console.log(JSON.stringify(data));
      // getting all categories name for dropdown in brands
      this.parentCategories=data.map(({name})=>name);

    })
  }

  getAllBrands()
  { 
    // Brands Data to be shown in the datatable

    this.spinner=true;
 
    this.adminservice.getAllBrands().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource <BrandsModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner=false;
    })
  }
  onFileSelected(event)
  {
    this.selectedFilelogo=<File>event.target.files[0];
    var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewUrl = reader.result;
      }
    
  }

  onFileSelectedside(event)
  {
    this.selectedFilesidebar=<File>event.target.files[0];
    var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewurlSide = reader.result;
      }
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
  this.getAllBrands();
  this.categoryForm = this.formBuilder.group({
  
   cnfname:[""],
   cnfarea:[""],
   cnfinvestment:[""],
   cnfteam:[""],
   distributorname:[""],
   distributorarea:[""],
   distributorinvestment:[""],
   distributorteam:[""],
   dealername:[""],
   dealerarea:[""],
   dealerinvestment:[""],
   dealerteam:[""],
   brands:[""], // premium selected brands in the category brandcategory
   description:[""],
   distributor:[""],
   parentcategory:[""],
   brandcategory:[""]

  
   
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
