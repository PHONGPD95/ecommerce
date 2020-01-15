import { User } from '~modules/models/user/user.model';

import { getModelForClass } from '@typegoose/typegoose';

export const su = {
  fullname: 'SUPERADMIN',
  username: 'su',
  password: '123456',
  profileId: 'superadmin',
};

export const createSu = async () => {
  const userModel = getModelForClass(User);
  const user = await userModel.findOne({
    username: su.username,
  });
  if (!user) {
    await userModel.create(su);
  } else {
    Object.assign(user, { password: su.password });
    await user.save();
  }
};
