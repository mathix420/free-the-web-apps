export default defineEventHandler(async (event) => {
  const { uid } = getRouterParams(event);
  return `echo "TODO!"`;
});
