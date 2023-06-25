import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';


// GET (read)
export const GET = async (request,  { params }) => {
 
  try {
    await connectToDB(); //connectToDb() is a lambda function, it means that once it creates a connection, it dies

    const prompt = await Prompt.findById( params.id ).populate('creator'); 

    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 }) //500 -> server error
  }
}

// PATCH (update)
export const PATCH = async (request,  { params }) => {
  const { prompt, tag } = await request.json(); //parses the string coming from the request object into an object
 
  try {
    await connectToDB(); //connectToDb() is a lambda function, it means that once it creates a connection, it dies

    //Find the existing prompt by id
    const existingPrompt = await Prompt.findById( params.id ); 

    if (!existingPrompt) {
      return new Response("Prompt not found.", { status: 404 });
    }
    // Update prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompt", { status: 200 })

  } catch (error) {

    return new Response("Error Updating Prompt", { status: 500 }) //500 -> server error
  }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    //Find the prompt by id and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
}

