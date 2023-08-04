import { Theme } from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { Client } from "postmark";
const apiKey = process.env.POSTMARK_API_TOKEN;
if (!apiKey) throw new Error("Missing POSTMARK_API_TOKEN environment variable");

const postmarkClient = new Client(apiKey);

export default async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme } = params;
  const templateId = process.env.POSTMARK_SIGN_IN_TEMPLATE;

  if (!templateId) {
    throw new Error("Missing template id");
  }
  console.log({ identifier, url, provider, theme });
  const result = await postmarkClient.sendEmailWithTemplate({
    TemplateId: parseInt(templateId),
    To: identifier,
    From: "info@quenelle.app",
    TemplateModel: {
      action_url: url,
      product_name: "foreignKey",
    },
    Headers: [
      {
        // Set this to prevent Gmail from threading emails.
        // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
        Name: "X-Entity-Ref-ID",
        Value: new Date().getTime() + "",
      },
    ],
  });
  console.log({ result });
  if (result.ErrorCode) {
    throw new Error(result.Message);
  }
}
