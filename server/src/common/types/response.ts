export class AppResponse<T> {
  /**
   * @param data
   * @param message
   * @param statusCode
   */
  constructor(
    public data: T,
    public message: string,
    public status: number,
    public success: boolean
  ) {}
}