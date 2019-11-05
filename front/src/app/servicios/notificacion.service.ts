import { Notificacion } from '../modelos/notificacion.module';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class NotificacionesBusService {

  showNotificacionSource: Subject<Notificacion> = new Subject<Notificacion>();

  getNotificacion(): Observable<Notificacion> {
    return this.showNotificacionSource.asObservable();
  }

  showError(msg: string, summary?: string) {
    this.show('error', summary, msg);
  }

  showSuccess(msg: string, summary?: string) {
    this.show('success', summary, msg);
  }

  showInfo(msg: string, summary?: string) {
    this.show('info', summary, msg);
  }

  showWarn(msg: string, summary?: string) {
    this.show('warn', summary, msg);
  }

  private show(severity: string, summary: string, msg: string) {
    const notificacion: Notificacion = {
      severity: severity,
      summary: summary,
      detail: msg
    };

    this.notify(notificacion);

  }

  private notify(notificacion: Notificacion): void {
    this.showNotificacionSource.next(notificacion);
  }

}