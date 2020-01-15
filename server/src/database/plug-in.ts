import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

import { RequestContext } from '~context/index';

export const creatorPlugin = (schema: Schema) => {
  const processCreator = async function() {
    const authInfo = await RequestContext.authInfo();
    if (!authInfo) {
      return;
    }

    if (!this.creatorId) {
      this.creatorId = authInfo && new ObjectId(authInfo.sub);
    }
  };

  schema.pre('save', processCreator);
};
