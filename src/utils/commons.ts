export const toZero: (n: number)=> string = (n) => {
  return n < 10 ? '0' + n : '' + n
}