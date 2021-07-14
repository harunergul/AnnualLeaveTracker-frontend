import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Client } from "~models/client";
import { RequestPermissionService } from "~services/request-permission.service";
import { AuthService } from "~services/auth.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";
import { FormsComponent } from "./forms/forms.component";
import { SnackbarComponent } from "~components/snackbar/snackbar.component";

import { Controller } from "~base/controller";
import { templateJitUrl } from "@angular/compiler";
import { IPermissionRequest } from "~app/models";

@Component({
  selector: "app-request-permission",
  templateUrl: "./request-permission.component.html",
  styleUrls: ["./request-permission.component.css"],
})
export class RequestPermissionComponent implements OnInit {
  public displayedColumns = [
    "id",
    "startDate",
    "endDate",
    "description",
    "requestDate",
    "acceptanceStatus",
    "personid",
  ];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 5;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private requestPermissionService: RequestPermissionService,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(["/login"]);
    }
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  private openSnack(data: any): void {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000,
    });
  }

  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.getData();
  }

  getAcceptanceStatus(row: IPermissionRequest): string {
    if (row.acceptanceStatus == 0) {
      return "BEKLEMEDE";
    } else if (row.acceptanceStatus == 1) {
      return "KABUL EDILDI";
    } else {
      return "REDEDILDI";
    }
  }

  getData(): void {
    this.requestPermissionService
      .getUserPermissionRequests()
      .subscribe((data) => {
        if (data != null) {
          console.log(data);
          this.dataSource.data = data;
        } else {
          this.dataSource.data = [];
        }
      });
  }

  edit(permissionRequest: IPermissionRequest): void {
    this.requestPermissionService.getOne(permissionRequest.id).subscribe((data: IPermissionRequest)=>{
      console.log(data);
      const dialogRef = this.dialog.open(FormsComponent, {
        width: "400px",
        data: { title: "Talep Güncelleme", action: "edit", data: data },
      });

      dialogRef.afterClosed().subscribe((result) => {
          this.getData();
      });

    },
    (error:any)=>{
      this.openSnack( error.error);
    });

    /*this.clientService.getOne(client.id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(FormsComponent, {
          width: "400px",
          data: { title: "Update person", action: "edit", data: data.data },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
    */
  }

  save(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: "400px",
      data: { title: "İzin Talebi", action: "save" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getData();
      }
    });
  }

  delete(permissionRequest: IPermissionRequest): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "250px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this record?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.requestPermissionService
          .deleteRequest(permissionRequest.id)
          .subscribe((data: any) => {
            console.log(data);
            console.log("test");
            this.dataSource.data = this.dataSource.data.filter(
              (row: IPermissionRequest) => row.id != permissionRequest.id
            );
          });
      }
    });
  }
}
