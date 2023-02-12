import { requestAdapter } from '../adapters';
import { ServerError } from '../errors';
import { AntsApiResponseProtocol } from '../protocols/AntsApiResponseProtocol';

export async function getAntsList(): Promise<Ant[]> {
  const query = 'https://sg-ants-test.herokuapp.com/ants';

  try {
    const response: AntsApiResponseProtocol = await requestAdapter(query);
    return response.ants;
  } catch (error) {
    throw new ServerError('Server Error');
  }
}
