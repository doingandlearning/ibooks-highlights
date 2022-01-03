import books from "./ibooksdb.js";
import { templateAnnotations } from "./template.js";

async function run() {
  const results = await books.getAnnotations();
  console.log("Got results ...");
  await templateAnnotations(results);
  console.log("All done!");
}

run();
