export default function (path: string): string {
  return path.replace(/(?:\\)? /g, "\\ ");
}
