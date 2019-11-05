import { Component, OnInit, OnDestroy} from "@angular/core";
import { NotificacionesBusService} from './servicios/notificacion.service'
import { Notificacion} from './modelos/notificacion.module'


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent /*implements OnInit, OnDestroy */{
  title = "frontperfil";
  constructor(/*, private notificacionesBus: NotificacionesBusService*/) { }
  notificacionesSub : any;
  msgs: any[];
/*
  ngOnInit() {
      this.notificacionesSub = 
      this.notificacionesBus.getNotificacion().subscribe(
          (notificacion: Notificacion) => {
              this.msgs = [];
              this.msgs.push(notificacion);
          }
        );
  }
  ngOnDestroy() {
    if (this.notificacionesSub) {
        this.notificacionesSub.unsubscribe();
    }
}*/
}
