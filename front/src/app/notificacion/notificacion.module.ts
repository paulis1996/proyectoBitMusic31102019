import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionComponent } from './notificacion.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NotificacionComponent],
    exports: [NotificacionComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NotificacionModule { }