const config = {
    env : {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint : process.env.NEXT_PUBLIC_PROD_API_ENDPOINT,
        imagekit : {
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
            urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey : process.env.NEXT_PRIVATE_KEY!
        },
        databaseUrl : process.env.DATABASE_URL,
        upstash : {
            upstashUrl : process.env.UPSTASH_REDIS_URL,
            upstashToken : process.env.UPSTASH_REDIS_TOKEN,
            qstashUrl : process.env.QSTASH_URL,
            qstashToken : process.env.QSTASH_TOKEN
        }
    }
}
export default config