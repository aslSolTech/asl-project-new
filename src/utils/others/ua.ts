import { UAParser } from "ua-parser-js";

export const parseUserAgent = (userAgentString?: string) => {
    const parser = new UAParser(userAgentString);
    const { ua, device, os, cpu, engine } = parser.getResult();
    return { ua, device, os, cpu, engine };
};