import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const RichTextGroup = ({
  richTexts,
}: {
  richTexts: RichTextItemResponse[];
}) => {
  return (
    <>
      {richTexts
        .filter((richText) => richText.type === "text")
        .map((richText) => (
          <RichText key={richText.plain_text} richText={richText} />
        ))}
    </>
  );
};
