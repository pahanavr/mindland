import {
  connectToDB
} from '@utils/database';
import Mind from '@models/mind';

export const GET = async (req: Request, { params }: { params: Record<string, string> }) => {
  try {
    await connectToDB();

    const minds = await Mind.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(minds), {
      status: 200
    });
  } catch (error) {
    return new Response('Failed to fetch all minds', {
      status: 500
    });
  }
}