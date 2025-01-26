import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url : config.env.upstash.upstashUrl,
    token : config.env.upstash.upstashToken,
});

export default redis