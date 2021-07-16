import { Component, ViewChild, ChangeDetectorRef, OnInit } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AdminPermissionRequestService } from "~services/admin-permission-request.service";
import { AuthService } from "~services/auth.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";
import { FormsAdminComponent } from "./forms/forms.component";
import { SnackbarComponent } from "~components/snackbar/snackbar.component";

import { IPermissionRequest } from "~app/models";
@Component({
  selector: "app-permission-request-admin",
  templateUrl: "./permission-request-admin.component.html",
  styleUrls: ["./permission-request-admin.component.css"],
})
export class PermissionRequestAdminComponent implements OnInit {
  public displayedColumns = [
    "id",
    "personelname",
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
    private permissionService: AdminPermissionRequestService,
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
      return "Onay Bekleniyor";
    } else if (row.acceptanceStatus == 1) {
      return "Onaylandı";
    } else {
      return "Reddedildi";
    }
  }

  getData(): void {
    this.isLoading = true;
    this.permissionService.getAllPermissions().subscribe(
      (data) => {
        if (data != null) {
          this.dataSource.data = data;
        } else {
          this.dataSource.data = [];
        }
      },
      (error: any) => {},
      () => {
        this.isLoading = false;
      }
    );
  }

  edit(permissionRequest: IPermissionRequest): void {
    this.permissionService.getOne(permissionRequest.id).subscribe(
      (data: IPermissionRequest) => {
        console.log(data);
        const dialogRef = this.dialog.open(FormsAdminComponent, {
          width: "450px",
          data: { title: "Talep Güncelleme", action: "edit", data: data },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.getData();
        });
      },
      (error: any) => {
        this.openSnack(error.error);
      }
    );
  }

  accept(permissionRequest: IPermissionRequest) {
    let id = permissionRequest.id;
    let patchUpdate = {
      acceptanceStatus: 1,
    };

    this.permissionService.updateAcceptanceStatus(id, patchUpdate).subscribe(
      (response: any) => {},
      (error: any) => {
        this.openSnack(error.error)
      },
      () => {
        this.getData();
      }
    );
  }

  reject(permissionRequest: IPermissionRequest) {
    let id = permissionRequest.id;
    let patchUpdate = {
      acceptanceStatus: 2,
    };

    this.permissionService.updateAcceptanceStatus(id, patchUpdate).subscribe(
      (response: any) => {},
      (error: any) => {
        this.openSnack(error.error)
      },
      () => {
        this.getData();
      }
    );
  }
  save(): void {
    const dialogRef = this.dialog.open(FormsAdminComponent, {
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
        title: "Kaydı Sil",
        message: "Bu kaydı silmek istediğinize emin misiniz?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.permissionService
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
