interface ICommon {
  id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IHome extends ICommon {
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
