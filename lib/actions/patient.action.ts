import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user:CreateUserParams) =>{
      try {
        const newUser = await users.create(
          ID.unique(),
          user.email,
          user.phone,
          undefined,
          user.name
        )
        return parseStringify(newUser)
      } catch (error:any) {
        if(error && error?.code === 409){ //user already exists
          //filtering db and finding user and if user exists and returning user
            const documents = await users.list([
              Query.equal('email',[user.email])
            ])

            return documents?.users[0]
        }
      }
}