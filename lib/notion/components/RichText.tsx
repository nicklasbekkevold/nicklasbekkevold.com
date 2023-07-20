import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

export const RichText = ({ richText }: { richText: RichTextItemResponse }) => {
  if (richText.type === "text") {
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
