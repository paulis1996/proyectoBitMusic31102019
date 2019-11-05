import { Notificacion, TipoNotificacion } from '../modelos/notificacion.module';
import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificacionService {

    private subject = new Subject<Notificacion>();
    private mantenerRuta = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'mantenerRuta' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.mantenerRuta) {
                    // only keep for a single route change
                    this.mantenerRuta = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // enable subscribing to alerts observable
    onAlert(identificacion?: string): Observable<Notificacion> {
        return this.subject.asObservable().pipe(filter(x => x && x.identificacion === identificacion));
    }

    // convenience methods
    success(mensaje: string, identificacion?: string) {
        this.notificacion(new Notificacion({ mensaje, tipo: TipoNotificacion.Success, identificacion }));
    }

    error(mensaje: string, identificacion?: string) {
        this.notificacion(new Notificacion({ mensaje, tipo: TipoNotificacion.Error, identificacion }));
    }

    info(mensaje: string, identificacion?: string) {
        this.notificacion(new Notificacion({ mensaje, tipo: TipoNotificacion.Info, identificacion }));
    }

    warn(mensaje: string, identificacion?: string) {
        this.notificacion(new Notificacion({ mensaje, tipo: TipoNotificacion.Warning, identificacion }));
    }

    // main alert method    
    notificacion(notificacion: Notificacion) {
        this.mantenerRuta = notificacion.mantenerRuta;
        this.subject.next(notificacion);
    }

    // clear alerts
    clear(identificacion?: string) {
        this.subject.next(new Notificacion({ identificacion }));
    }
}