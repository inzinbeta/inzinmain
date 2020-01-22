import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule,MatSelectModule,MatInputModule,} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorvisualPipe } from './pipes/errorvisual.pipe';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Select2Module } from 'ng2-select2';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, SettingsComponent, ErrorvisualPipe],
  imports: [
    CommonModule,
    MatSnackBarModule, // Now this will be available in all th modules under admin,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,MatSelectModule,MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularEditorModule,
    Select2Module,
    DataTablesModule
  
  
  ]
  // export is very important such that theese modules can be used in other components as well
  ,exports:[DataTablesModule,Select2Module,AngularEditorModule,MatCheckboxModule,MatRadioModule,MatSelectModule,FooterComponent,FormsModule, ReactiveFormsModule,ErrorvisualPipe, NavbarComponent,MatTooltipModule, SidebarComponent, SettingsComponent,MatDialogModule,MatButtonModule,MatTableModule,MatSnackBarModule, MatPaginatorModule,MatSortModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatIconModule] // This export is necessary such that footer can be used in every componet under page
  ,providers: [],
})
export class SharedModule { }
