import { revalidatePath } from "next/cache";


export default async function handler (request: Request){
  try{
    if (request.headers.get('token') !== process.env.SECRET_TOKEN){
      return Response.json({message: 'Access denied'},{status: 400, statusText: 'Invalid Token'} );
    }
    revalidatePath('/events');
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {status: 400});
  }
  return new Response("Revalidation Success!");
}