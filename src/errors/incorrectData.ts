class IncorrectData extends Error {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'IncorrectData';
    this.statusCode = 400;
  }
}

export default IncorrectData;