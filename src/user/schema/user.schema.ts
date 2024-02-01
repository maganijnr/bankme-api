import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserAccountType{
   INDIVIDUAL = "INDIVIDUAL",
   BUSINESS = "BUSINESS",
}

export enum UserAccountLevel {
   LEVEL_1 = "LEVEL_1",
   LEVEL_2 = "LEVEL_2",
   LEVEL_3 = "LEVEL_3",
}

@Schema({ timestamps: true })
export class User extends Document{
   @Prop()
   name: string;

   @Prop({ unique: [true, 'Email already exist'] })
   email: string;

   @Prop()
   phone_number: string;

   @Prop()
   password: string;

   @Prop({
      enum: UserAccountType,
      default: UserAccountType.INDIVIDUAL
   })
   account_type: UserAccountType;

   @Prop({
      enum: UserAccountLevel,
      default: UserAccountLevel.LEVEL_1
   })
   account_level: UserAccountLevel;

   @Prop()
   account_number: string

   @Prop()
   account_balance?: string
}

export const UserSchema = SchemaFactory.createForClass(User)