export type Null<T> = T | null;

export type Undefined<T> = T | undefined

export type NullUndefined<T> = T | null | undefined;

export type NullableObject<T> = { [P in keyof T]: T[P] | null };

export type PartialNullable<T> = {
  [key in keyof T]: T[key] extends object
    ? PartialNullable<T[key]>
    : Null<T[key]>;
};

export type PartialNullableUndefined<T> = {
  [key in keyof T]?: T[key] extends object
    ? PartialNullableUndefined<T[key]>
    : NullUndefined<T[key]>;
};

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

export type Paths<T> = T extends object
  ? T extends (infer U)[]
    ? Join<"0", Paths<U>>
    : // biome-ignore lint/complexity/noBannedTypes: <explanation>
    T extends string | number | boolean | Function
    ? never
    : {
        [K in keyof T]: T[K] extends object
          ? // biome-ignore lint/complexity/noBannedTypes: <explanation>
            T[K] extends string | number | boolean | Function
            ? K
            : Join<K, Paths<T[K]>>
          : K;
      }[keyof T]
  : never;

export enum StatusEnum {
  LOADING = "LOADING",
  ERROR = "ERROR",
  IDLE = "IDLE",
  DONE = "DONE",
  SUSPEND = "SUSPEND",
  NOT_FOUND = "NOT_FOUND",
}

export interface CommonColumns {
  createdAt: string;
  deletedAt: Null<string>;
  updatedAt: string;
}

export interface ServerDataCommon {
  statusCode: number;
  messageCode: string;
  message: string;
}

export interface ServerDataSuccess<T> extends ServerDataCommon {
  success: true;
  body: T;
}

export interface ServerDataError extends ServerDataCommon {
  success: false;
  body: Null<any>;
}

export type ServerData<T> = ServerDataSuccess<T> | ServerDataError;

export type PaginatedFilter<T extends Record<string, any>> = Partial<T> & { skip: number; limit: number, order?: Record<keyof T, 'asc' | 'desc'> };

export interface Paginated<T> {
  data: T[];
  total: number;
}