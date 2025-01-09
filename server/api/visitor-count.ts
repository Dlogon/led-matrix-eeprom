import updateVisitors from "../helper/update-visitors";

export default defineEventHandler(async (event) => {
  return await updateVisitors("update-unique-visitors");
});
