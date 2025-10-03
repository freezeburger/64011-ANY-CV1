
/**
 * A type representing a unique identifier, which can be either a string or a number.
 * For items within the same collection, the type should be consistent.
 */
export type UniqueId = string | number;

export interface WithUniqueId {
  id: UniqueId;
}

export interface ProcessResponse<T> {
  data: T;
  error?: Error;
}

export enum AcknowledgementStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface HumanResponse<T> extends ProcessResponse<T>{
  message?: string;
}
