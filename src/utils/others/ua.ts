import { UAParser, type IResult } from "ua-parser-js";

interface parseUserAgentProps {
  userAgentString?: string;
}

export type parseUserAgentResult = IResult;

export const parseUserAgent = ({ userAgentString }: parseUserAgentProps = {}): parseUserAgentResult => {
  const parser = new UAParser(userAgentString);
  return parser.getResult();
};