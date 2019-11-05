export class Notificacion {
    tipo: TipoNotificacion;
    mensaje: string;
    identificacion: string;
    mantenerRuta: boolean;

    constructor(init?:Partial<Notificacion>) {
        Object.assign(this, init);
    }
}

export enum TipoNotificacion {
    Success,
    Error,
    Info,
    Warning
}