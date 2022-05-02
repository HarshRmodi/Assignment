import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { Interest } from 'src/app/business/interest/interest';
import { ConfirmationDialog } from 'src/app/component/comformation-dialog/confirmation-dialog.component';
import { InterestService } from 'src/app/service/interest.service';
import { InterestdialogComponent } from '../interestdialog/interestdialog.component';

@Component({
  selector: 'app-interestlist',
  templateUrl: './interestlist.component.html',
  styleUrls: ['./interestlist.component.css']
})
export class InterestlistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns = ['fullName', 'email', 'gender', 'interest', "action"];
  public dataSource: MatTableDataSource<Interest> = new MatTableDataSource();
  public interest: Interest = new Interest();
  public isLoading = false;
  public pageSize = 5;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public searchTextvalue: string = ""
  public fieldName: string = "id"
  public orderType: string = "desc"

  constructor(public _dialog: MatDialog,
    public _interestService: InterestService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.defaultMethodLoad();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((res) => {
      this.paginator.pageIndex = 0
      this.currentPage = this.paginator.pageIndex;
      this.fieldName = res.active;
      this.orderType = res.direction;
      this.loadEmployeeInterestPaginated();
    });

  }

  public defaultMethodLoad() {
    this.loadEmployeeInterestPaginated();
  }

  /* #region  EmployeeInterestPaginated */
  public async loadEmployeeInterestPaginated() {
    this.isLoading = true;
    let pageNo = this.currentPage == 0 ? 1 : this.currentPage + 1;

    const combine = combineLatest(this._interestService.getEmployeeInterestList(this.searchTextvalue), this._interestService.getEmployeeInterestListPaginated(pageNo, this.pageSize, this.searchTextvalue, this.fieldName, this.orderType));
    combine.subscribe((result: any) => {
      this.dataSource.data = result[1];
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = result[0].length;
      });
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  public pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex
    this.loadEmployeeInterestPaginated();
  }
  /* #endregion */

  /* #region  InterestDialog */
  public openInterestDialog() {
    const dialogRef = this._dialog.open(InterestdialogComponent, {
      width: '400px',
      data: { ...this.interest },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.submitInterest(result);
      else
        this.interest = new Interest();
    });
  }
  /* #endregion */

  /* #region  Filter Search */
  public processChange = this.debounce((event: any) => this.applyFilterSearch(event));

  public applyFilterSearch(filterValue: any) {
    let filterString = filterValue.target.value;
    this.searchTextvalue = filterString?.trim()?.toLowerCase();
    this.loadEmployeeInterestPaginated();
  }
  /* #endregion */

  /* #region  Interest Add Update */
  public submitInterest(result: Interest) {
    if (result.id)
      this.updateEmployeeInterest(result);
    else
      this.createEmployeeInterest(result);
  }

  public editClick(editData: Interest) {
    this.interest = editData;
    this.openInterestDialog()
  }


  public createEmployeeInterest(interest: Interest) {
    this._interestService.createEmployeeInterest(interest).subscribe((res: any) => {
      this._snackBar.open("Employee Interest has been added successfully", "", { duration: 1000 });
      this.loadEmployeeInterestPaginated();
      this.interest = new Interest();
    })
  }

  public updateEmployeeInterest(interest: Interest) {
    this._interestService.updateEmployeeInterest(interest.id, interest).subscribe((res: any) => {
      this._snackBar.open("Employee Interest has been updated successfully", "", { duration: 1000 });
      this.loadEmployeeInterestPaginated();
      this.interest = new Interest();

    })
  }
  /* #endregion */

  /* #region  Delete Employee Interest */
  public deleteClick(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed)
        this.deleteEmployeeInterest(id);
    });
  }

  public deleteEmployeeInterest(id: number) {
    this._interestService.deleteEmployeeInterest(id).subscribe((res: any) => {
      this._snackBar.open("Employee Interest has been deleted successfully", "", { duration: 1000 });
      this.loadEmployeeInterestPaginated();
    })
  }
  /* #endregion */

  public debounce(func: any, timeout = 1500) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

}
