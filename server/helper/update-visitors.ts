//This is for update unique visitors or page views, as is same logic, we can merge them into one file

type PageCountEndpoint = "update-page-visitors" | "update-unique-visitors";

export default async function updateVisitors(uri: PageCountEndpoint) {
  try {
    const pageName = process.env.COUNT_VISITORS_PAGE_NAME;
    const VisitorsUrl: string = process.env.COUNT_VISITORS_URL || "";
    const payload = {
      site_name: pageName,
    };

    const url = new URL(uri, VisitorsUrl).toString();

    const request = await $fetch<{ visit_count: number }>(url, {
      method: "POST",
      body: payload,
    });

    const { visit_count } = request;
    return visit_count;
  } catch (error) {
    console.error("Error fetching visit count:", error);
  }
}
