import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timeStamp: Date;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  invoiceId: string;
}

export const reservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
