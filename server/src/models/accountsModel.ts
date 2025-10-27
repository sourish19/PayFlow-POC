import { Schema, InferRawDocType, model } from 'mongoose';

const schemaDefinition = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
} as const;

const accountsSchema = new Schema(schemaDefinition, { timestamps: true });

export type RawUserDocument = InferRawDocType<typeof schemaDefinition>;

export const Account = model('account', accountsSchema);

/*
usually store an integer which represents the INR value with 
decimal places (for eg, if someone has 33.33 rs in their account, 
store 3333 in the database).

There is a certain precision that needs to support (which for india is
2/4 decimal places) and this allows to get rid of precision
errors by storing integers in your DB

floating-point numbers are imprecise in binary representation
store it as 3333 paise (integer

Different currencies have different decimal precisions so based on that need to implement this 
*/
