export class BaseApi {
  protected url = '';

  constructor(url: string) {
    const baseUrl = 'http://10.0.1.50:3000/';
    this.url = baseUrl + url;
  }
}
