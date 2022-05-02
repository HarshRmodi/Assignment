import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InterestRoutingModule } from './interest-routing.module';
import { InterestlistComponent } from './interestlist/interestlist.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { InterestdialogComponent } from './interestdialog/interestdialog.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InterestService } from 'src/app/service/interest.service';
import { ConfirmationDialog } from 'src/app/component/comformation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    InterestlistComponent,
    InterestdialogComponent,
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    InterestRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
  ],
  providers: [
    InterestService
  ]
})
export class InterestModule { }
