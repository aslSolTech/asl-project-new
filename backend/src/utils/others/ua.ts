import { UAParser, type IResult } from 'ua-parser-js';

interface ParseUserAgent {
  userAgentString?: string;
}

export type parseUserAgentResult = IResult;

export const parseUserAgent = ({ userAgentString }: ParseUserAgent = {}): parseUserAgentResult => {
  const parser = new UAParser(userAgentString);
  return parser.getResult();
};
