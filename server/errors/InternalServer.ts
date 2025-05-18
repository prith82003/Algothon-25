import CustomError from "./CustomError";

export default class InternalServer extends CustomError {
  status = 500;
  constructor(message = "Internal server error, please try again later!") {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
