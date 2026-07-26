export function onRequest(context) {
  return Response.json({
    country: context.request.cf?.country || "unknown",
  });
}
