// A mock function to mimic making an async request for data
export function fetchCount(amount = 1): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(amount), 500));
}
