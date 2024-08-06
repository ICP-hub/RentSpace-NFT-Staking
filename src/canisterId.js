const production = false;

export const host = (production) ? "https://icp-api.io" : "http://127.0.0.1:4943"

export const canisterID = {
    EXT: production ? "m2nno-7aaaa-aaaah-adzba-cai" : "bkyz2-fmaaa-aaaaa-qaaaq-cai",
    NFT_BACKEND: production ? "yr432-oqaaa-aaaao-a3phq-cai" : "bd3sg-teaaa-aaaaa-qaaba-cai"
}
