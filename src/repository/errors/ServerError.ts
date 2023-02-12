export class ServerError extends Error {
  constructor(message: string) {
    super('ServerError');
    this.name = 'ServerError';
    this.message = message;
  }
}
