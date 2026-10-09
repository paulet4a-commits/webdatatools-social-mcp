# WebDataTools Search, video & social data MCP server
`webdatatools-social-mcp`

An MCP server with 21 search, video & social data tools for AI agents — Claude Desktop, Cursor, Cline or any MCP client. Google search results, YouTube channels, videos, search and comments, podcasts, Bluesky, Telegram channels and Substack publications — no API keys needed.

**This server uses *your own* Apify API token.** Every tool call runs a [WebDataTools](https://apify.com/webdatatools) Actor under your Apify account and is billed to your Apify credit — pay per result, the price is in each tool description. Your token is only sent to Apify's API.

## Quick start

Requires Node.js 18+.

```bash
APIFY_TOKEN=apify_api_... npx -y github:paulet4a-commits/webdatatools-social-mcp
```

Get a free token (the free plan includes monthly credit): https://console.apify.com/settings/integrations

## Claude Desktop / Cursor

Add this to `claude_desktop_config.json` (Claude Desktop) or `.cursor/mcp.json` (Cursor):

```json
{
  "mcpServers": {
    "webdatatools-social": {
      "command": "npx",
      "args": [
        "-y",
        "github:paulet4a-commits/webdatatools-social-mcp"
      ],
      "env": {
        "APIFY_TOKEN": "apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

## Tools (21)

| Tool | What it does | Price (free plan) | Backing Actor |
|---|---|---|---|
| `youtube_shorts_scraper` | YouTube Shorts Scraper | $0.001 / short | [Actor](https://apify.com/webdatatools/youtube-shorts-scraper) |
| `pinterest_pins_scraper` | Pinterest Pins Scraper | $0.0005 / pin | [Actor](https://apify.com/webdatatools/pinterest-pins-scraper) |
| `youtube_transcript_scraper` | YouTube Transcript Scraper | $0.004 / video | [Actor](https://apify.com/webdatatools/youtube-transcript-scraper) |
| `google_search_scraper` | Google Search Results Scraper — SERP API | $0.005 / result | [Actor](https://apify.com/webdatatools/google-search-scraper) |
| `youtube_comments_scraper` | YouTube Comments Scraper — Comments & Replies | $0.0005 / result | [Actor](https://apify.com/webdatatools/youtube-comments-scraper) |
| `youtube_channel_videos` | YouTube Channel Latest Videos (RSS, no API key) | $0.001 / result | [Actor](https://apify.com/webdatatools/youtube-channel-videos) |
| `youtube_channel_scraper` | YouTube Channel Scraper (videos, shorts, live) | $0.0005 / video | [Actor](https://apify.com/webdatatools/youtube-channel-scraper) |
| `youtube_search_scraper` | YouTube Search Results Scraper (videos, channels, no API key) | $0.0005 / result | [Actor](https://apify.com/webdatatools/youtube-search-scraper) |
| `youtube_video_details` | YouTube Video Details Scraper (views, likes, description, tags) | $0.001 / video | [Actor](https://apify.com/webdatatools/youtube-video-details) |
| `podcast_lookup` | Apple Podcasts Lookup & Episodes Scraper | $0.001 / episode | [Actor](https://apify.com/webdatatools/podcast-lookup) |
| `bluesky_scraper` | Bluesky Post, Search & Profile Scraper | $0.0005 / post | [Actor](https://apify.com/webdatatools/bluesky-scraper) |
| `x_tweet_scraper` | X Tweet Scraper (Twitter Posts by URL, No Login) | $0.0005 / tweet | [Actor](https://apify.com/webdatatools/x-tweet-scraper) |
| `tiktok_profile_scraper` | TikTok Profile Scraper (Followers, Likes, Bio, Video Stats) | $0.001 / profile | [Actor](https://apify.com/webdatatools/tiktok-profile-scraper) |
| `telegram_channel_scraper` | Telegram Channel Posts Scraper | $0.0005 / Post | [Actor](https://apify.com/webdatatools/telegram-channel-scraper) |
| `substack_scraper` | Substack Publication & Posts Scraper | $0.0005 / Post | [Actor](https://apify.com/webdatatools/substack-scraper) |
| `google_play_reviews_scraper` | Google Play Reviews Scraper | $0.0002 / review | [Actor](https://apify.com/webdatatools/google-play-reviews-scraper) |
| `app_store_reviews_scraper` | App Store Reviews Scraper | $0.0001 / review | [Actor](https://apify.com/webdatatools/app-store-reviews-scraper) |
| `trustpilot_reviews_scraper` | Trustpilot Reviews Scraper (Ratings, Replies, No Login) | $0.001 / review | [Actor](https://apify.com/webdatatools/trustpilot-reviews-scraper) |
| `google_trends_scraper` | Google Trends Scraper | $0.01 / keyword | [Actor](https://apify.com/webdatatools/google-trends-scraper) |
| `google_ads_transparency_scraper` | Google Ads Transparency Scraper | $0.001 / ad | [Actor](https://apify.com/webdatatools/google-ads-transparency-scraper) |
| `bilibili_scraper` | Bilibili Scraper (Videos, Search, Popular) | $0.003 / video | [Actor](https://apify.com/webdatatools/bilibili-scraper) |

## More WebDataTools MCP servers

- [webdatatools-mcp-server](https://github.com/paulet4a-commits/webdatatools-mcp-server) — the 10 most popular tools in one server
- [webdatatools-domain-mcp](https://github.com/paulet4a-commits/webdatatools-domain-mcp) — Domain & website intelligence
- [webdatatools-rag-mcp](https://github.com/paulet4a-commits/webdatatools-rag-mcp) — Web content for AI & RAG
- [webdatatools-leads-mcp](https://github.com/paulet4a-commits/webdatatools-leads-mcp) — Leads, jobs & company data
- [webdatatools-dev-mcp](https://github.com/paulet4a-commits/webdatatools-dev-mcp) — Developer, app & research data

## License

MIT
