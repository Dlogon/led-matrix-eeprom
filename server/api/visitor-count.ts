export default defineEventHandler(async (event) => {
  try {
    const pageName = process.env.COUNT_VISITORS_PAGE_NAME;
    const VisitorsUrl: string = process.env.COUNT_VISITORS_URL || "";
    const request = {
      visitor_page_name: pageName,
    };

    const { visit_count } = await $fetch<{ visit_count: number }>(VisitorsUrl, {
      method: "POST",
      body: request,
    });

    return visit_count;
  } catch (error) {
    console.error("Error fetching visit count:", error);
  }
});
