import fs from "fs";
import mustache from "mustache";
const { render } = mustache;

import { NOTE_DIR } from "./config.js";

const knownTemplate = fs.readFileSync("./templates/known.md").toString();
const unknownTemplate = fs.readFileSync("./templates/unknown.md").toString();

export async function templateAnnotations(results) {
  const sourceKnown = results.filter((item) => item.title);

  let currentResult = [];

  sourceKnown.forEach((result, index) => {
    if (sourceKnown[index - 1]?.title != result.title) {
      if (currentResult.length > 0) {
        const formattedTitle = currentResult[0].title.split(" ").join("");
        const obj = {
          title: currentResult[0].title,
          author: currentResult[0].author,
          notes: currentResult.map(
            (result) =>
              `${result.note ? `*${result.note}* ` : ""}${result.selected_text}`
          ),
        };
        const output = render(knownTemplate, obj);
        fs.writeFileSync(`${NOTE_DIR}${formattedTitle}.md`, output);
      }
      currentResult = [];
    }
    if (result.note || result.selected_text || result.represent_text) {
      currentResult.push(result);
    }
  });

  const sourceUnknown = results.filter((item) => !item.title);
  const unknownRendered = render(unknownTemplate, {
    notes: sourceUnknown
      .filter((item) => item.selected_text || item.note)
      .map(
        (result) =>
          `${result.note ? `*${result.note}* ` : ""}${result.selected_text}`
      ),
  });
  fs.writeFileSync(`${NOTE_DIR}/source_unknown.md`, unknownRendered);

  return true;
}
