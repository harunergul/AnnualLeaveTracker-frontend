import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormatDatePipe } from './format-date.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core'


@NgModule({
    declarations:[
        FormatDatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        FormatDatePipe
    ],
    providers:[
        { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' }
    ]
})
export class SharedModule { }
