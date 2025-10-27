import { HydratedDocument } from 'mongoose';
import { RawUserDocument } from '../models/userModel';

// type TUser = RawUserDocument & { _id: ObjectId }; // This also works

const sanatizeUser = (user: HydratedDocument<RawUserDocument>) => {
  const sanitize = {
    id: String(user._id),
    fullName: user.firstName + ' ' + user.lastName,
    email: user.email,
  };
  return sanitize;
};

export default sanatizeUser;
