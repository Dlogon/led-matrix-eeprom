import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
// import { handleRequest } from "./handleEnterRequest";

const client = new DynamoDBClient({});
const dinamo = DynamoDBDocumentClient.from(client);
const tableName = "total_page_visits";

export const handler = async (event, context) => {
  const { tableToUpdate, visitorPageName } = await handleRequest(event);

  console.log(tableToUpdate);
  console.log(visitorPageName);
  const command = new UpdateCommand({
    TableName: tableToUpdate,
    Key: { site_name: visitorPageName },
    UpdateExpression:
      "SET visit_count = if_not_exists(visit_count, :start) + :inc",
    ExpressionAttributeValues: {
      ":inc": 1,
      ":start": 1,
    },
    ReturnValues: "UPDATED_NEW",
  });

  console.log("Waiting");

  const response = await dinamo.send(command);
  console.log(response);
  return response.Attributes;
};

const handleRequest = async (event) => {
  //total_page_unique_visitors -> unique visitors
  //total_page_visits
  const possibleApiGateWayrouteKeysForUpdateVisitor = [
    "POST /update-page-visitors",
    "PUT /update-page-visitors",
  ];

  const possibleApiGateWayrouteKeysForUpdateTotalPageCount = [
    "POST /update-unique-visitors",
    "PUT /update-unique-visitors",
  ];
  const body = JSON.parse(event.body || "{}");
  let tableToUpdate = "total_page_visits";
  let visitorPageName = event.site_name || "default";
  console.log("**********");
  console.log(body);
  if (
    event.hasOwnProperty("routeKey") &&
    possibleApiGateWayrouteKeysForUpdateVisitor.includes(event.routeKey)
  ) {
    tableToUpdate = "total_page_visits";
    visitorPageName = body.site_name;
  } else if (
    event.hasOwnProperty("routeKey") &&
    possibleApiGateWayrouteKeysForUpdateTotalPageCount.includes(event.routeKey)
  ) {
    tableToUpdate = "total_page_unique_visitors";
    visitorPageName = body.site_name;
  }
  return { tableToUpdate, visitorPageName };
};
