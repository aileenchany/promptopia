import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB(); //connectToDb() is a lambda function, it means that once it creates a connection, it dies

    const newPrompt = new Prompt({
      creator: userId,
      prompt, //same as prompt: prompt
      tag //same as tag: tag
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 })

  } catch (error) {

    return new Response("Failed to create a new prompt.", { status: 500 }) //500 -> server error
  }
}