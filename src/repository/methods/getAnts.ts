import { basePath, Endpoints } from '../../constants';
import { requestAdapter } from '../adapters';
import { ServerError } from '../errors';
import { AntsApiResponseProtocol } from '../protocols/AntsApiResponseProtocol';

export async function getAntsList(): Promise<Ant[]> {
  const antsEndpoint = `${basePath}/${Endpoints.ants}`;

  try {
    const response: AntsApiResponseProtocol = await requestAdapter(
      antsEndpoint
    );

    return response.ants;
  } catch (error) {
    throw new ServerError('Error loading ants list.');
  }
}
