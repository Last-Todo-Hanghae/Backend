class CustomError extends Error {
    /* REVIEW: 
      customError에서 일반 system error와 구분할 수 있는 메시지를 주시는 것도 좋습니다!
      ex) `ERROR = ${message}`
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
