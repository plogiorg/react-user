type WithId<T extends Record<string, unknown>> = T & { id: string };

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserModel = WithId<{
  firstName: string;
  lastName: string;
  email: string;
}>;

export type Service = WithId<{
  id: number,
  createdAt: Date,
  updatedAt: Date,
  userId: string,
  description: string,
  price: number,
  isDeleted: boolean,
  userInfo?:any,
  serviceTypeId: number,
  lan: number,
  lat:number,
  city: string,
  address: string
}>;

export type ServiceResponse = {
  services : Service[]
}

export type SingleServiceResponse = {
  service : Service
}

export type  GetServiceParams = {
  city?: string;
  search?: string;
  sortBy?:string;
  priceFrom?: number;
  priceTo?: number;
  typeId?: number | undefined;
}


export type ServiceType = WithId<{
  id: number,
  title: string;
  description: string;
  image: string;
  createdAt: Date,
  updatedAt: Date,
  isActive: true
}>;



export type ServiceTypeReponse = {
  types : ServiceType[]
}

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string
  country: string;
};