import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (request,  { params }) => {
 
  try {
    await connectToDB(); //connectToDb() is a lambda function, it means that once it creates a connection, it dies

    const prompts = await Prompt.find({creator: params.id }).populate('creator'); 

    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error) {

    return new Response("Failed to fetch all prompts.", { status: 500 }) //500 -> server error
  }
}