export function generateReferralId(name: string) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '') +
    '-' +
    Math.random().toString(36).substring(2, 8)
  );
}
