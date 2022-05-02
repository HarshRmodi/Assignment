import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Interest } from 'src/app/business/interest/interest';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-interestdialog',
  templateUrl: './interestdialog.component.html',
  styleUrls: ['./interestdialog.component.css']
})
export class InterestdialogComponent implements OnInit {

  @ViewChild('myForm', { static: false }) public MyForm!: NgForm;
  @ViewChild('search') searchTextBox!: ElementRef;

  public interest = new Interest();
  public selectFormControl = new FormControl();
  public searchTextboxControl = new FormControl();
  public selectedValues: any = [];
  public interestList: string[] = [
    'Angular', 'React', 'Vue', 'Flutter', 'Node.JS', '.Net'
  ]
  public filteredOptions: Observable<any[]> | undefined;


  constructor(public dialogRef: MatDialogRef<InterestdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.defaultMethodLoad();
  }

  public defaultMethodLoad() {
    if (this.data.id) {
      this.interest = this.data
      this.selectedValues = this.data.interest;
    }

    this.filteredOptions = this.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  /* #region  interest submit */
  public submitForm(e: any) {
    if (this.MyForm.valid && (this.selectFormControl.value && this.selectFormControl.value.length > 0)) {
      this.interest.interest = this.selectFormControl.value;
      this.dialogRef.close(this.interest);
    } else
      this._snackBar.open("Please fill all fields", "", { duration: 1000 });

  }

  public onCancelClick(): void {
    this.MyForm.reset();
      this.dialogRef.close();
  }
  /* #endregion */

  /* #region  for multiple interest */
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.interestList.filter((option: any) => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  /**
   * Remove from selected values based on uncheck
   */
  public selectionChange(event: any) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  public openedChange(e: any) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  /**
   * Clearing search textbox value 
   */
  public clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state 
   */
  public setSelectedValues() {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e: any) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
  /* #endregion */


}


