// import { createRouteHandler } from "uploadthing/next";
// import { ourFileRouter } from "./core";

import { ourFileRouter } from "./core";
import { createRouteHandler } from "uploadthing/next";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
