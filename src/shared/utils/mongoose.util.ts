import { Types } from 'mongoose';

export const parseObjectId = (id: string): Types.ObjectId => {
  try {
    return new Types.ObjectId(id);
  } catch (err) {
    return null;
  }
};

export const parseObjectIds = (ids: string[]): Types.ObjectId[] => {
  try {
    return ids.map((id) => parseObjectId(id));
  } catch (err) {
    return [];
  }
};

export const isValidObjectIds = (arrIds) => {
  const invalidIds = [];
  arrIds.forEach((id) => {
    if (!Types.ObjectId.isValid(id)) {
      invalidIds.push(id);
    }
  });
  return invalidIds;
};
