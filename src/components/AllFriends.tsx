/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useQuery, gql } from "@apollo/client"
import IFriend from "../interfaces/interfaces"

interface IFriends {
  getAllFriends: [IFriend]
}

export const ALL_FRIENDS = gql`
query{
  getAllFriends {
     id
    firstName
    lastName
    email
    
  }
}
`

export default function All() {

    const {loading, error, data, refetch} = useQuery<IFriends>(
      ALL_FRIENDS,
      {fetchPolicy:"cache-first"}
      )
      if (loading) return <p>loading...</p>
      if (error) return <p>{error.toString()}</p>
      return ( <div>
       <table className="table">
         <thead>
          <tr><th>ID</th><th>firstName</th><th>lastName</th><th>Email</th></tr>
         </thead>
         <tbody>

           {data && data.getAllFriends.map((friend) => (

       <tr key={friend.id}><td>{friend.id}</td><td>{friend.firstName}</td><td>{friend.lastName}</td><td>{friend.email}</td></tr> 
           ))}
        
         </tbody>
         </table>
            <button onClick={()=>refetch()}> Refresh</button>
      </div>)

 
}