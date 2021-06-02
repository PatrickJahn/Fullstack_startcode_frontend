import React, { useMemo, useState } from "react";
import IFriend, { Gender } from "../interfaces/interfaces"
import { useMutation, gql, ApolloClient, ApolloError } from "@apollo/client"
import {ALL_FRIENDS} from "./AllFriends"




interface IFriendResult {
  createFriend: IFriend
}

 
interface FriendInput  {
  firstName: string
  lastName: string
  email: string
  password: string 
}
interface IFriendInput  {
  friend: FriendInput
}


const ADD_FRIEND = gql`
mutation createFriend($friend: FriendInput) {
  createFriend(input:$friend){
    firstName
    lastName
    email
    id
    role
  }
}`

type AddFriendProps = {
  initialFriend?: FriendInput
}

interface IKeyableFriend extends FriendInput {
  [key: string]: any
}
const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: FriendInput = { firstName: "", lastName: "", email: "" , password:""}
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }

  const [friend, setFriend] = useState({ ...newFriend })
  const [err, setErr] = useState("")
  const [fData, setFdata] = useState("")
  const [createFriend, {loading, data}] = useMutation<IFriendResult, IFriendInput>(
    ADD_FRIEND,
    {
    update(cache, {data}){
      const addedFreind = data?.createFriend;
      const d: any = cache.readQuery({query: ALL_FRIENDS})
      if (!d){
        return
      }
      let allFriends = d.getAllFriends
      
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: {getAllFriends: [...allFriends, addedFreind]}
      })

    }
    }
    )

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }

  
    friendToChange[id] = event.currentTarget.value;
    
    setFriend({ ...friendToChange })
  }

   interface apiError{
    message: string
  }
  const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
 
    createFriend({
      variables:{friend:{...friend}}
    }).then(res => setFdata("w")).catch((fejl? : apiError)=>{
      if (fejl) {
        setErr(fejl.message)
      } else {
        setErr("")
      }

    })
     
  }
  return (
    <form onSubmit={handleSubmit}>
      {err != "" && err != "undefined is not an object" && <p style={{color: "red"}}>{err}</p>}
     {loading && <p>Loading...</p>}
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password <br/>
        <input type="text" id="password" value={friend.password} onChange={handleChange} />
        <br />
     </label>
      <br /><br />
      <input type="submit" value="Save Friend" />
    </form>
  );
}

export default AddFriend;