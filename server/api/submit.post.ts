import { customAlphabet } from "nanoid";
import type { SubmitWebsite } from "~~/types";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

export default defineEventHandler(async (event) => {
  const uid = nanoid();
  const website = await readBody<SubmitWebsite>(event);

  // Checking for collisions is probably overkilled here (129M IDs before 1% chance of collision)
  // Worst case scenario is that we overwrite an existing unverified website just before someone will paste the link, the user will install the wrong app.
  await hubKV().set(`unverified-website:${uid}`, {
    ...website,
    id: uid,
  }, { ttl: 60 * 60 * 24 });

  return { uid };
});
