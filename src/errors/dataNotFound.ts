
class DataNotFound extends Error {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'DataNotFound';
    this.statusCode = 404;
  }
}

export default DataNotFound;