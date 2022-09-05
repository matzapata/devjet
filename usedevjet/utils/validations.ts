export function isPasswordValid(pw: string): boolean {
  return (
    /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 6
  );
}
