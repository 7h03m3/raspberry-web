import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MotorDto } from '../shared/dtos/motor.dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MotorApiService {
  constructor(private socket: Socket) {}

  public onUpdate(): Observable<MotorDto> {
    return this.socket.fromEvent<MotorDto>('motor_state');
  }

  public setState(state: MotorDto) {
    this.socket.emit('motor_set', state);
  }

  public getState() {
    this.socket.emit('motor_get');
  }
}
