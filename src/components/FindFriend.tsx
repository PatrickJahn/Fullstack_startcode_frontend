/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import IFriend from "../interfaces/interfaces"



interface IFriendResult {
  getFriendFromId: IFriend
}


interface IVariableInput {
  id: string
}


const GET_FRIEND = gql`
 query getFriend($id: String!) {
  getFriendFromId(id:$id){
     id
     email
     firstName
     lastName
   }
}
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [getFriend,{loading,called, error,data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-first"}
  );

  const fetchFriend = () => {
    getFriend({variables: {id}})
 
  }

  return (
    <div>
      ID:<input type="txt" value={id} onChange={e => {
        setId(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      <h2>Fetch a friend using the provided id</h2>
        {called && loading && <p>Loading...</p>}
        {error && <p>No user found...</p>}
        {data && <p>{data.getFriendFromId.firstName} {data.getFriendFromId.lastName}</p>}
    </div>)
}
