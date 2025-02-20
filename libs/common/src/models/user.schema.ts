import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';

@Schema({
  versionKey: false,
})
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;
  @Prop()
  password: string;
  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const userSchema = SchemaFactory.createForClass(UserDocument);
