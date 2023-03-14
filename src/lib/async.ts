export const delay = (time) => {
  return new Promise((resolve) => setTimeout(() => resolve(1), time))
}
