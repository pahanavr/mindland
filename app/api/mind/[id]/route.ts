import {
  connectToDB
} from '@utils/database';
import Mind from '@models/mind';

// GET POST
export const GET = async (req: Request, { params }: { params: Record<string, string> }) => {
  try {
    await connectToDB();

    const mind = await Mind.findById(params.id).populate('creator');

    if (!mind) {
      return new Response('Mind not found', {
        status: 404
      });
    }

    return new Response(JSON.stringify(mind), {
      status: 200
    });
  } catch (error) {
    return new Response('Failed to fetch mind', {
      status: 500
    });
  }
}

// PATCH POST
export const PATCH = async (req: Request, { params }: { params: Record<string, string> }) => {
  const { mind, tag } = await req.json();

  try {
    await connectToDB();

    const existingMind = await Mind.findByIdAndUpdate(params.id);

    if (!existingMind) {
      return new Response('Mind not found', {status: 404})
    }

    existingMind.mind = mind;
    existingMind.tag = tag;

    await existingMind.save();

    return new Response('Successfully updated the Minds', { status: 200 });
  } catch (error) {
    return new Response('Failed to update mind', {status: 500})
  }
}

// DELETE POST
export const DELETE = async (req: Request, { params }: { params: Record<string, string> }) => {
  try {
    await connectToDB();

    await Mind.findByIdAndRemove(params.id);

    return new Response('Mind delete successfully', {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to delete mind', {
      status: 500
    })
  }
}
