import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";

const RichText = ({ richText }: { richText: RichTextItemResponse }) => {
  if (richText.type === "text") {
    console.log(richText.text.content);
    if (richText.href !== null) {
      return (
        <Link href={richText.href} target="_blank" rel="noreferrer">
          <RichText
            richText={{
              ...richText,
              href: null,
            }}
          />
        </Link>
      );
    }

    if (richText.annotations.bold) {
      return (
        <b>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                bold: false,
              },
            }}
          />
        </b>
      );
    }
    if (richText.annotations.italic) {
      return (
        <i>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                italic: false,
              },
            }}
          />
        </i>
      );
    }
    if (richText.annotations.strikethrough) {
      return (
        <s>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                strikethrough: false,
              },
            }}
          />
        </s>
      );
    }
    if (richText.annotations.underline) {
      return (
        <u>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                underline: false,
              },
            }}
          />
        </u>
      );
    }
    if (richText.annotations.code) {
      return (
        <code>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                code: false,
              },
            }}
          />
        </code>
      );
    }
    return <>{richText.plain_text}</>;
  }

  return <>{richText.plain_text}</>;
};

export function renderNotionBlock(block: BlockObjectResponse) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id}>
          {block.paragraph.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </p>
      );
    case "heading_1":
      return (
        <h3 key={block.id}>
          {block.heading_1.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </h3>
      );
    case "heading_2":
      return (
        <h4 key={block.id}>
          {block.heading_2.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </h4>
      );
    case "heading_3":
      return (
        <h5 key={block.id}>
          {block.heading_3.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </h5>
      );
    case "callout":
      return (
        <blockquote key={block.id}>
          {block.callout.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </blockquote>
      );
    case "bulleted_list_item":
      return (
        <li key={block.id}>
          {block.bulleted_list_item.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </li>
      );
    case "numbered_list_item":
      return (
        <li key={block.id}>
          {block.numbered_list_item.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
        </li>
      );
    case "code":
      return (
        <code key={block.id}>
          {block.code.rich_text
            .filter((rich_text) => rich_text.type === "text")
            .map((rich_text, i) => (
              <RichText key={`${block.id}-${i}`} richText={rich_text} />
            ))}
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
