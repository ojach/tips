Remove-Item .wrangler\tmp\pages-* -Recurse -Force -ErrorAction SilentlyContinue
npx wrangler pages deploy dist