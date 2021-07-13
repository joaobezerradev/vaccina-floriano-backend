import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator'

export function Match<T> (
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object: T, propertyName: string):void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate (value: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as unknown)[relatedPropertyName]
          return value === relatedValue
        },
        defaultMessage (args: ValidationArguments): string {
          const [relatedPropertyName] = args.constraints
          return this.error || `${relatedPropertyName} not match.`
        }
      }
    })
  }
}
