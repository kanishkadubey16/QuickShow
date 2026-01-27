# Debugging Guide - Black Screen Issue

## Quick Checks

1. **Open Browser Console** (Press F12 or Cmd+Option+I on Mac)
   - Look for any red error messages
   - Check if you see "TMDB Service Loaded" message
   - Check if API key is present

2. **Correct URL**
   - Make sure you're visiting: `http://localhost:5173/`
   - NOT `http://localhost:5174/` (old port)

3. **Hard Refresh**
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - This clears the cache

## Common Issues

### Issue 1: Environment Variable Not Loading
**Symptom**: Console shows "API Key present: No"
**Solution**: 
- Check `.env` file has: `VITE_TMDB_API_KEY=8265bd1679663a7ea12ac168da84d2e8`
- Restart dev server (Ctrl+C, then `npm run dev`)

### Issue 2: JavaScript Error
**Symptom**: Red errors in console
**Solution**: Share the error message

### Issue 3: CORS Error
**Symptom**: Console shows "CORS policy" error
**Solution**: This shouldn't happen with TMDB API, but if it does, the fallback data should load

## What Should Happen

When working correctly, you should see in console:
```
TMDB Service Loaded
API Key present: Yes
API Key (first 10 chars): 8265bd1679...
```

And the page should show:
- A Marvel movie in the Hero section
- 8 Marvel movies in "Now Showing"
- Marvel trailers below
