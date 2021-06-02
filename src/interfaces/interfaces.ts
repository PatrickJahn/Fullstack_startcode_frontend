// export enum Gender {
//   MALE,
//   FEMALE,
//   OTHER
//  }

export type Gender = "MALE" | "FEMALE" | "OTHER"
 
 export default interface IFriend  {
   id? :string
   firstName: string
   gender: Gender
   age: number
   lastName: string
   email: string
   password?: string
 }
 