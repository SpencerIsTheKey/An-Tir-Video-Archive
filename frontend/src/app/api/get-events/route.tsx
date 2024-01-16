import { revalidatePath } from "next/cache";
import type { NextRequest, NextResponse} from "next/server";


export async function POST (request: NextRequest){
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