import { RawUserDocument } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: RawUserDocument;
    }
  }
}

/*
declaration merging, the ts compiler can merge two or more declarations with the same name into a single definition this means that the resulting definition has all the features of the original declarations
 declaration merging allows us to add additional properties and methods to an existing type
*/
