import {
  connectToDB
} from '@utils/database';
import Mind from '@models/mind';

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const minds = await Mind.find({}).populate('creator');

    return new Response(JSON.stringify(minds), {
      status: 200
    });
  } catch (error) {
    return new Response('Failed to fetch all minds', {
      status: 500
    });
  }
}
