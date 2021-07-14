import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RequestPermissionService } from '~services/request-permission.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import { Client } from '~app/models/client';
import { AuthService } from '~app/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  public frm: FormGroup;
  minDate = new Date();
 

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private requestPermissionService: RequestPermissionService,
    public snack: MatSnackBar,
    private auth : AuthService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000,
      verticalPosition: "top", 
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      id: new FormControl(IS_EDITING ? data.id : null),
      startDate: new FormControl(IS_EDITING ? data.startDate : null, [Validators.required]),
      endDate: new FormControl(IS_EDITING ? data.endDate : null, [Validators.required]),
      description: new FormControl(IS_EDITING ? data.description : null, [Validators.required]),
      status: new FormControl(IS_EDITING ? data.status : 0),
      user: new FormControl(IS_EDITING ? data.user : this.auth.userInfo),

    });
  }

  public save(form: FormGroup) {
    console.log(form.value);
    this.requestPermissionService.addRequestPermission(form.value).subscribe((data: any) => {
      
      this.openSnack({message:"Talebiniz başarılı bir şekilde oluşturuldu."});
      this.dialogRef.close(true);
    }
    ,
    (error: any)=>{ 
      this.openSnack( error.error);
    });
  }

  public getNameErrorMessage() {
    return this.frm.controls.first_name.hasError('required') ? 'First name is required' :
      this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getLastNameErrorMessage() {
    return this.frm.controls.last_name.hasError('required') ? 'Last name is required' :
      this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getAgeErrorMessage() {
    return this.frm.controls.age.hasError('required') ? 'Age is required' :
      this.frm.controls.age.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

  public getGenderErrorMessage() {
    return this.frm.controls.gender.hasError('required') ? '' : '';
  }

}
