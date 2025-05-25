export default function IsKeyInObject<T extends object>(key: PropertyKey, passedObject: T): key is keyof T {
    return key in passedObject;
}