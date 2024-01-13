import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PwmService } from '../../shared/services/pwm.service';
import { MotorDto } from '../../shared/dtos/motor.dto';
import { GpioService } from '../../shared/services/gpio.service';
import { MotorState } from '../../shared/enums/motor-state.enum';

@WebSocketGateway(3001, { transports: ['websocket'] })
export class MotorGatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('MotorGatewayGateway');

  constructor(private pwmService: PwmService, private gpioService: GpioService) {}

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('motor_get')
  async getMotor(client: Socket): Promise<void> {
    this.sendUpdate();
  }

  @SubscribeMessage('motor_set')
  async setMotor(client: Socket, state: MotorDto): Promise<void> {
    const pwm = this.pwmService.getDcMotor();
    const forwardGpio = this.gpioService.getDcMotorForward();
    const backwardGpio = this.gpioService.getDcMotorBackward();

    this.pwmService.setFrequency(state.frequency);
    pwm.setDutyCycle(state.dutyCycle);
    forwardGpio.set(state.state == MotorState.Forward);
    backwardGpio.set(state.state == MotorState.Backward);

    this.sendUpdate();
  }

  private sendUpdate() {
    const state = new MotorDto();
    const pwm = this.pwmService.getDcMotor();
    const forwardGpio = this.gpioService.getDcMotorForward().get();
    const backwardGpio = this.gpioService.getDcMotorBackward().get();

    state.dutyCycle = pwm.getDutyCycle();

    if (forwardGpio && !backwardGpio) {
      state.state = MotorState.Forward;
    } else if (backwardGpio && !forwardGpio) {
      state.state = MotorState.Backward;
    } else {
      state.state = MotorState.Stop;
    }

    state.frequency = this.pwmService.getFrequency();

    this.wss.emit('motor_state', state);
  }
}
