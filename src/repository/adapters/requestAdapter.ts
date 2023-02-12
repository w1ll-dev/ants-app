export async function requestAdapter(query: string): Promise<any> {
  const response = await fetch(query);
  const responseJson = await response.json();
  return responseJson;
}
