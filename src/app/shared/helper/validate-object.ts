export type ObjectValidator<T> = { [K in keyof T]: (value: unknown) => boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateObject<T>(obj: any,
                                  validator: ObjectValidator<T>): obj is T {
  return Object
    .keys(validator)
    .every(key => validator[key as keyof T](obj[key]));
}
