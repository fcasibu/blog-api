export default interface ResponseError extends Error {
  status?: number;
}
