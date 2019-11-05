import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Notificacion, TipoNotificacion } from '../modelos/notificacion.module';
import { NotificacionService } from '../servicios/notificacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit, OnDestroy {
  @Input() id: string;

  notificaciones: Notificacion[] = [];
  subscripciones: Subscription;

  constructor(private notificacionService: NotificacionService) { }

  ngOnInit() {
      this.subscripciones = this.notificacionService.onAlert(this.id)
          .subscribe(notificacion => {
              if (!notificacion.mensaje) {
                  this.notificaciones = [];
                  return;
              }
              this.notificaciones.push(notificacion);
          });
  }

  ngOnDestroy() {
      this.subscripciones.unsubscribe();
  }

  quitarNotificacion(notificacion: Notificacion) {
      this.notificaciones = this.notificaciones.filter(x => x !== notificacion);
  }
  cssClass(notificacion: Notificacion) {
    if (!notificacion) {
        return;
    }

    // return css class based on alert type
    switch (notificacion.tipo) {
        case TipoNotificacion.Success:
            return 'alert alert-success';
        case TipoNotificacion.Error:
            return 'alert alert-danger';
        case TipoNotificacion.Info:
            return 'alert alert-info';
        case TipoNotificacion.Warning:
            return 'alert alert-warning';
    }
}
}
