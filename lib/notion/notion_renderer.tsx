import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { RichTextGroup } from "./components/RichTextGroup";

export function renderNotionBlock(block: BlockObjectResponse) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id}>
          <RichTextGroup richTexts={block.paragraph.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h3 key={block.id}>
          <RichTextGroup richTexts={block.heading_1.rich_text} />
        </h3>
      );
    case "heading_2":
      return (
        <h4 key={block.id}>
          <RichTextGroup richTexts={block.heading_2.rich_text} />
        </h4>
      );
    case "heading_3":
      return (
        <h5 key={block.id}>
          <RichTextGroup richTexts={block.heading_3.rich_text} />
        </h5>
      );
    case "callout":
      return (
        <blockquote key={block.id}>
          <RichTextGroup richTexts={block.callout.rich_text} />
        </blockquote>
      );
    case "bulleted_list_item":
      return (
        <li key={block.id}>
          <RichTextGroup richTexts={block.bulleted_list_item.rich_text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <RichTextGroup richTexts={block.numbered_list_item.rich_text} />
        </li>
      );
    case "code":
      return (
        <code key={block.id}>
          <RichTextGroup richTexts={block.code.rich_text} />
        </code>
      );
    case "image":
      return (
        <Image
          key={block.id}
          src={
            block.image.type === "external"
              ? block.image.external.url
              : block.image.file.url
          }
          alt={
            block.image.caption.length !== 0
              ? block.image.caption
                  .map((rich_text) => rich_text.plain_text)
                  .join("")
              : ""
          }
        />
      );
    default:
      return null;
  }
}
