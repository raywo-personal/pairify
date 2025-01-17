export class DataFormatError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'DataFormatError';
  }

}
