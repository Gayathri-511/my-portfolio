/*
 * SOP Assistant — portfolio demo build.
 * Same app code as the original userscript; SOP content below is dummy data.
 * Search, ranking and summaries run entirely in the browser.
 */
(function () {
  'use strict';

  const PANEL_ID = 'esop-assistant-root';
  if (document.getElementById(PANEL_ID)) return;

  const DEBUG_SEARCH = false;

  let lastSearchDebug = null;

  const DEBUG_SEARCH_TESTS = false;

  let SOP = [];

const EMBEDDED_SOP = [
  {
    "id": "offers-overview",
    "title": "Offers & Windows (Overview)",
    "keywords": [
      "offers",
      "windows",
      "overview"
    ],
    "body": "Offers & Windows\nEvery title must have a live offer and an availability window before it can be published. Offers are validated in Asset Hub (Offers tab), Offer Manager and Rights Console. The detailed steps for each title type are listed in the sections below.\nFor every marketplace, filter by the Title ID you received in the intake sheet and confirm offers and windows for the planned go-live date.\n## Exceptions\n## Offer withdrawn\nIf the Offers tab in Asset Hub shows the offer as withdrawn, mark the offers check as Fail in QC Tracker.\n## Resolution\nSev3 ticket to the Catalog Offers team. CTI: Streaming Catalog → Content Issue → Offer Withdrawn.\nNote: Raise the ticket only when Rights Console shows an active window for the go-live date.\n## Offers & windows both missing\nIf, after all steps below, both the offer and the window are missing for the go-live date, QC is not required for the title. Mark it \"Not Ready\" and move to the next title."
  },
  {
    "id": "2.1.1",
    "title": "2.1.1 Title Offer Missing",
    "keywords": [
      "title",
      "offer",
      "missing",
      "movie",
      "episode"
    ],
    "body": "## Asset Hub Validation Steps\nIn Asset Hub, open the Offers tab and filter by the Title ID from the intake sheet. Sort by Window Start and find the planned go-live date. The go-live date must match the Window Start date shown in Asset Hub.\n## Offer not in Asset Hub\nIf the offer is missing in Asset Hub, search for the same Title ID in Offer Manager.\n## Offer in Offer Manager\nNote: A difference of 1 day between go-live date and Window Start is expected because of time zones and is not an issue.\nExample: Go-live date in intake is 03/14/2026 and Window Start in Asset Hub is 03/15/2026 — this is a pass.\n## Resolution\nOffer missing for a movie or episode: 0 to 3 days SLA.\nSev3 ticket to the Catalog Offers team. CTI: Streaming Catalog → Offers → General, Group: Catalog Offers.\n- Raise tickets only for the primary Title ID, even if offers exist for a secondary ID.\n- Do not raise a ticket if the window itself is missing — follow 2.1.2 instead.\n- Mark the offers check as Fail in QC Tracker and add the ticket number in comments."
  },
  {
    "id": "2.1.2",
    "title": "2.1.2 Availability Window Missing",
    "keywords": [
      "availability",
      "window",
      "missing",
      "rights"
    ],
    "body": "## Rights Console Validation Steps\nWindows are checked in Rights Console for the Title ID. In QC Tracker, open the title and use the Rights link to jump directly to the correct record.\nConfirm that a window exists for every marketplace listed in the intake sheet and that it covers the go-live date.\n## When the window is missing\n- If the window is missing for one marketplace only, mark Fail for that marketplace and Pass for the rest.\n- If the window is missing for all marketplaces, mark the title \"Not Ready\" — no ticket is required.\n- If the window ends before the go-live date, treat it as missing.\n## Resolution\nWindow missing: 2 to 5 days SLA.\nSev3 ticket to the Rights Operations team. CTI: Streaming Catalog → Rights → Window Missing.\nNote: Always attach a screenshot of the Rights Console record to the ticket."
  },
  {
    "id": "2.1.3",
    "title": "2.1.3 Live Event Offers",
    "keywords": [
      "live",
      "event",
      "offers",
      "sports"
    ],
    "body": "Live events (concerts, sports, premieres) follow a shorter checklist because the offer is created close to the event.\n## Validation Steps\n- Confirm the event offer exists in Offer Manager at least 24 hours before start time.\n- Confirm the event start time in Asset Hub matches the intake sheet, in the marketplace's local time zone.\n- Confirm the replay offer (if any) starts after the live window ends.\n## Exceptions\nException: Events marked \"Surprise Drop\" in the intake sheet may have no offer until 1 hour before start. Do not fail these titles.\n## Resolution\nSev2 ticket to the Live Events desk. CTI: Streaming Catalog → Live → Offer Missing."
  },
  {
    "id": "2.1.4",
    "title": "2.1.4 Season Offers",
    "keywords": [
      "season",
      "offers",
      "bundle",
      "pass"
    ],
    "body": "A season can be sold as a season pass in addition to per-episode offers.\n## Validation Steps\nIn Asset Hub, filter by the Season ID and confirm a season-pass offer exists when the intake sheet says \"Season pass: Yes\".\n| Intake value | Expected offer | Result if missing |\n| --- | --- | --- |\n| Season pass: Yes | Season pass + episode offers | Fail |\n| Season pass: No | Episode offers only | Pass |\n| Season pass: TBD | Episode offers only | Pass with comment |\n## Resolution\nSev3 ticket to the Catalog Offers team. CTI: Streaming Catalog → Offers → Season Pass."
  },
  {
    "id": "2.2",
    "title": "2.2 Metadata",
    "keywords": [
      "metadata",
      "overview"
    ],
    "body": "Metadata is the information shown on the detail page: title name, synopsis, maturity rating, cast, release date, original language and genre.\nMetadata exists per locale (for example en-us, de-de, ja-jp) and must be checked for every locale listed in the intake sheet.\n- Missing metadata blocks publishing and is always a Fail.\n- Incorrect metadata is a Fail only when it is visible to customers.\n- Formatting issues (extra spaces, wrong casing) are logged as Minor and do not block publishing."
  },
  {
    "id": "2.2.1",
    "title": "2.2.1 Title Name Validation",
    "keywords": [
      "title",
      "name",
      "metadata",
      "locale"
    ],
    "body": "The title name is supplied by the content partner and represents the movie, series or episode. It can legitimately differ between marketplaces.\n## Asset Hub Validation Steps\nSelect each locale from the locale drop-down and confirm the title name is shown in the correct language and script.\n## Title name in the wrong language\nIf the de-de locale shows an English title, check whether the partner supplied a localized title in Partner Portal. If they did, it is a catalog ingest issue; if they did not, it is a partner issue.\n| Scenario | Example | Mark as |\n| --- | --- | --- |\n| Localized title missing | de-de shows \"The Long Road\" | Fail – Partner |\n| Localized title present but not shown | Partner Portal has \"Der Lange Weg\" | Fail – Ingest |\n| Original title intentionally kept | Brand name or proper noun | Pass |\n## Episode titles\nEpisode titles such as \"Episode 4\" are acceptable only when the partner has supplied no episode name in any locale.\n## Resolution\nPartner issue: Sev4 ticket to Partner Success. CTI: Streaming Catalog → Metadata → Partner Redelivery.\nIngest issue: Sev3 ticket to Catalog Ingest. CTI: Streaming Catalog → Metadata → Ingest Error.\nNote: Never edit metadata directly in Asset Hub, even if you have edit access."
  },
  {
    "id": "2.2.2",
    "title": "2.2.2 Synopsis Missing/Incorrect",
    "keywords": [
      "synopsis",
      "description",
      "missing",
      "incorrect"
    ],
    "body": "The synopsis is a short summary of the plot, main characters and tone of the title.\n## Synopsis language as per locale\nThe synopsis must be in the same language as the locale. A Spanish synopsis on the en-us locale is a Fail.\n## Synopsis checks\n- Synopsis is present for every locale in the intake sheet.\n- Synopsis belongs to this title (not a different season or a similarly named movie).\n- Synopsis contains no spoilers flagged in the partner notes.\n- Synopsis is under 400 characters for episodes and 800 characters for movies.\n## Exceptions\nException: Kids titles may use a one-line synopsis. Do not fail for length.\n## Resolution\nSev4 ticket to Partner Success. CTI: Streaming Catalog → Metadata → Synopsis."
  },
  {
    "id": "2.2.3",
    "title": "2.2.3 Maturity Rating Missing",
    "keywords": [
      "maturity",
      "rating",
      "missing",
      "age"
    ],
    "body": "Every title needs a maturity rating for each marketplace before publishing.\n## Validation Steps\nIn Asset Hub, open the Ratings panel and confirm a rating exists for every marketplace in the intake sheet.\n- A rating of \"Pending\" counts as missing.\n- A rating from a different marketplace's rating board counts as missing.\n## Resolution\nRaise a request to the Ratings Desk and mark the title as Failed in QC Tracker with comments.\nNote: The Ratings Desk usually responds within 1 business day."
  },
  {
    "id": "2.2.4",
    "title": "2.2.4 Episode Sequence Incorrect",
    "keywords": [
      "episode",
      "season",
      "sequence",
      "order"
    ],
    "body": "## Validation Steps\nOpen the season on the detail page and check that episodes appear in ascending order with no gaps or duplicates.\n- Two episodes with the same number is a duplicate issue.\n- A missing number (for example 1, 2, 4) is a sequence gap.\n## Resolution\nSev3 ticket to Catalog Ingest. CTI: Streaming Catalog → Metadata → Episode Sequence."
  },
  {
    "id": "duplicate-title",
    "title": "Duplicate Title Listing",
    "keywords": [
      "duplicate",
      "title",
      "merge",
      "listing"
    ],
    "body": "A duplicate listing happens when the same movie or season appears twice in search or browse with different Title IDs.\n## How to identify\n- Search the title name in the customer preview and look for two cards with the same artwork or year.\n- Compare runtime, release year and cast in Asset Hub for both Title IDs.\n## When to merge\nIf runtime, year and cast match, request a merge. If any of them differ, it is a different edition (for example Director's Cut) and should not be merged.\n## Resolution\nSev3 ticket to Catalog Ingest. CTI: Streaming Catalog → Metadata → Title Merge.\nNote: Mention both Title IDs and which one should survive."
  },
  {
    "id": "2.2.5",
    "title": "2.2.5 Cast Missing",
    "keywords": [
      "cast",
      "starring",
      "actors",
      "missing"
    ],
    "body": "## Validation Steps\nCheck that at least the top 3 credited cast members are shown on the detail page for movies and series.\nException: Documentaries, stand-up and nature titles may have no cast. Do not fail these.\n## Resolution\nSev4 ticket to Partner Success. CTI: Streaming Catalog → Metadata → Cast."
  },
  {
    "id": "2.2.6",
    "title": "2.2.6 Release Date Missing",
    "keywords": [
      "release",
      "date",
      "year",
      "missing"
    ],
    "body": "## Validation Steps\nThe original release year must be shown on the detail page. For episodes, the original air date must be present in Asset Hub.\nNote: A release year in the future is allowed only for titles marked \"Pre-order\".\n## Resolution\nSev4 ticket to Partner Success. CTI: Streaming Catalog → Metadata → Release Date."
  },
  {
    "id": "2.2.7",
    "title": "2.2.7 Original Language",
    "keywords": [
      "original",
      "language",
      "spoken"
    ],
    "body": "Original language is the main spoken language of the title as produced. It drives the default audio track.\n## Validation Steps\nConfirm the original language in Asset Hub matches the language heard in the first 5 minutes of the video.\n- A dubbed track must never be set as the original language.\n- Silent films use \"No linguistic content\"."
  },
  {
    "id": "2.2.8",
    "title": "2.2.8 Genre Missing",
    "keywords": [
      "genre",
      "category",
      "missing"
    ],
    "body": "## Validation Steps\nEvery title must have at least one primary genre. Sub-genres are optional.\nIf the genre is clearly wrong (for example a horror film tagged as Kids), mark Fail even though the field is not empty.\n## Resolution\nSev4 ticket to Catalog Curation. CTI: Streaming Catalog → Metadata → Genre."
  },
  {
    "id": "2.3",
    "title": "2.3 Artwork",
    "keywords": [
      "artwork",
      "image",
      "poster",
      "ratio"
    ],
    "body": "## General Checks\n## Ratio\nEach artwork type has a required aspect ratio. Check the ratio in the artwork details panel in Asset Hub.\n| Artwork | Ratio | Minimum size |\n| --- | --- | --- |\n| Episode Thumbnail | 16:9 | 1920 × 1080 |\n| Season Poster | 2:3 | 1000 × 1500 |\n| Hero Banner | 16:9 | 3840 × 2160 |\n| Square Tile | 1:1 | 1200 × 1200 |\n![Artwork ratio reference](img-ratios)\n## Quality\n- No visible compression, blurring or stretching.\n- No watermarks, partner logos or \"Coming Soon\" text unless the title is a pre-order.\n- Title text on artwork must match the locale.\n## Safe zone\nKey elements (faces, title text) must stay inside the central safe zone so they are not cropped on TV and mobile.\n![Safe zone guide](img-safezone)\n## Resolution\nSev4 ticket to Creative Services. CTI: Streaming Catalog → Artwork → Quality."
  },
  {
    "id": "2.3.1",
    "title": "2.3.1 Episode Thumbnail",
    "keywords": [
      "episode",
      "thumbnail",
      "image",
      "artwork"
    ],
    "body": "## Validation Steps\n- Each episode must have its own thumbnail; the same image on every episode is a Fail.\n- The thumbnail must come from that episode and must not reveal major plot points.\n- Black or blank frames are a Fail.\n## Resolution\nSev4 ticket to Creative Services. CTI: Streaming Catalog → Artwork → Episode Thumbnail."
  },
  {
    "id": "2.3.2",
    "title": "2.3.2 Season Poster",
    "keywords": [
      "season",
      "poster",
      "image",
      "artwork"
    ],
    "body": "## Validation Steps\n- The season poster must show the correct season number when text is present.\n- Posters from a previous season are a Fail.\n- Text must be in the locale language or be the original logo.\n## Resolution\nSev4 ticket to Creative Services. CTI: Streaming Catalog → Artwork → Season Poster."
  },
  {
    "id": "2.3.3",
    "title": "2.3.3 Hero Banner",
    "keywords": [
      "hero",
      "banner",
      "image",
      "artwork"
    ],
    "body": "Hero banners appear at the top of the home page and must meet the highest quality bar.\n## Validation Steps\n- Banner is 16:9 at 3840 × 2160 or larger.\n- No title text baked into the image; title text is added by the app.\n- Faces and focal points sit in the right two-thirds so the app overlay does not cover them.\n## Resolution\nSev3 ticket to Creative Services. CTI: Streaming Catalog → Artwork → Hero Banner."
  },
  {
    "id": "2.4.1",
    "title": "2.4.1 Source Video Missing",
    "keywords": [
      "source",
      "video",
      "missing",
      "mezzanine",
      "file"
    ],
    "body": "## Asset Hub Validation Steps\nThis check confirms that a playable source video exists for the title.\n- Open Source Assets in Asset Hub and confirm a video file with status \"Ready\".\n- A file with status \"Processing\" for more than 24 hours is treated as missing.\n- A file with status \"Failed\" is always missing.\n## Resolution\nSource video missing: 1 to 2 days SLA.\nSev2 ticket to Media Operations. CTI: Streaming Catalog → Playback → Source Missing.\nNote: If the go-live date is within 48 hours, escalate in the Media Operations channel as well."
  },
  {
    "id": "2.4.2",
    "title": "2.4.2 Video Quality Issues",
    "keywords": [
      "video",
      "quality",
      "issue",
      "pixelation",
      "black",
      "screen"
    ],
    "body": "During video QC, check the first 2 minutes, two random points in the middle and the last 2 minutes (the 5-point check).\nBelow are the common video quality issues and how to mark them.\n| Issue | What it looks like | Severity |\n| --- | --- | --- |\n| Pixelation | Blocky squares during motion | Major |\n| Black screen | Picture goes black while audio continues | Critical |\n| Frame freeze | Picture stops while audio continues | Critical |\n| Colour banding | Visible stripes in gradients | Minor |\n| Interlacing | Comb-like lines on moving edges | Major |\n## Exceptions\nException: Intentional creative effects (for example a deliberately grainy flashback) are not issues. Check the partner notes before failing.\n## Resolution\nCritical or Major: Sev3 ticket to Media Operations. CTI: Streaming Catalog → Playback → Video Quality.\nMinor: Log in QC Tracker only; no ticket required."
  },
  {
    "id": "2.4.3",
    "title": "2.4.3 Audio Quality Issues",
    "keywords": [
      "audio",
      "quality",
      "silent",
      "distortion"
    ],
    "body": "While performing audio QC, listen at the same 5 points used for video.\n- Silent audio for more than 3 seconds where speech or music is expected is Critical.\n- Distortion, clipping or crackling is Major.\n- Low volume compared with other titles is Minor.\n## Audio track validation\nConfirm every audio language in the intake sheet appears in the player's audio menu and plays the correct language.\n## Resolution\nSev3 ticket to Media Operations. CTI: Streaming Catalog → Playback → Audio Quality."
  },
  {
    "id": "2.4.4",
    "title": "2.4.4 Audio Video Out of Sync",
    "keywords": [
      "audio",
      "video",
      "sync",
      "lip",
      "out of sync"
    ],
    "body": "## Validation Steps\nCheck lip sync at the 5 QC points. If speech is consistently early or late by more than 2 frames (about 80 ms), it is an out-of-sync issue.\n- Drift (sync gets worse over time) is always a Fail, even if the start is in sync.\n- Sync issues in one audio language only should be marked against that language.\n## Resolution\nSev3 ticket to Media Operations. CTI: Streaming Catalog → Playback → AV Sync.\nNote: Include the timestamp and the approximate offset in the ticket."
  },
  {
    "id": "2.4.5",
    "title": "2.4.5 Subtitle Out of Sync",
    "keywords": [
      "subtitle",
      "sync",
      "timing",
      "captions"
    ],
    "body": "## Validation Steps\nSubtitles must appear and disappear with the dialogue. A delay of more than 1 second at any QC point is an out-of-sync issue.\n- If subtitles are early or late by the same amount throughout, mark \"Offset\".\n- If timing gets worse through the title, mark \"Drift\".\n## Exceptions\nException: Song lyrics may appear slightly early for readability. Do not fail lyrics alone.\n## Resolution\nSev3 ticket to Localization Ops. CTI: Streaming Catalog → Subtitles → Timing."
  },
  {
    "id": "2.4.6",
    "title": "2.4.6 Subtitle Quality Issue",
    "keywords": [
      "subtitle",
      "quality",
      "missing",
      "cut",
      "garbled"
    ],
    "body": "## Validation Steps\nAt any QC point, it is a subtitle quality issue if:\n- The subtitle track stops partway through the title.\n- Characters are garbled or shown as boxes.\n- Subtitles overlap on-screen text and cannot be read.\n- The subtitle language does not match the selected track.\n## Resolution\nSev3 ticket to Localization Ops. CTI: Streaming Catalog → Subtitles → Quality."
  },
  {
    "id": "2.4.7",
    "title": "2.4.7 Forced Narrative Events Missing",
    "keywords": [
      "forced",
      "narrative",
      "events",
      "missing",
      "subtitles"
    ],
    "body": "Forced narrative subtitles translate on-screen text and foreign-language dialogue that viewers need even when subtitles are off.\n## Validation Steps\n- Play scenes with on-screen signs, letters or foreign dialogue and confirm the forced narrative appears.\n- Confirm forced narrative events are present for every audio language that needs them.\n- An empty forced narrative file is a Fail.\n## Resolution\nSev3 ticket to Localization Ops. CTI: Streaming Catalog → Subtitles → Forced Narrative."
  },
  {
    "id": "2.4.8",
    "title": "2.4.8 Trailer Playback Issue",
    "keywords": [
      "trailer",
      "playback",
      "preview"
    ],
    "body": "## Validation Steps\n- The trailer must play from the detail page without errors.\n- The trailer must belong to this title and season.\n- Trailers with age-restricted content must carry the same or higher maturity rating as the title.\n## Resolution\nSev4 ticket to Media Operations. CTI: Streaming Catalog → Playback → Trailer."
  },
  {
    "id": "2.5",
    "title": "2.5 Recheck Process",
    "keywords": [
      "recheck",
      "retest",
      "fixed",
      "ticket"
    ],
    "body": "When a ticket is resolved, the title comes back to the queue for a recheck.\n## Recheck Steps\n1. Open the original ticket and read the resolution notes.\n2. Re-run only the checks that failed, plus a quick 5-point playback check.\n3. If fixed, update QC Tracker to Pass and close the ticket.\n4. If not fixed, reopen the ticket with new evidence and keep the title as Fail.\nNote: A title can be rechecked a maximum of 3 times before escalation to the team lead."
  },
  {
    "id": "2.6",
    "title": "2.6 Redelivery Ticket Validation",
    "keywords": [
      "redelivery",
      "ticket",
      "validation",
      "partner"
    ],
    "body": "Redelivery tickets ask the partner to send a corrected file. Every redelivery ticket must be validated before it is sent.\n## Ticket checklist\n- Title ID, season and episode numbers are correct.\n- The issue type matches one of the issue types in this SOP.\n- Timestamps are included for playback issues.\n- A screenshot or short clip is attached.\n- The correct CTI is used.\n## Common mistakes\n| Mistake | Why it matters | Fix |\n| --- | --- | --- |\n| Wrong Title ID | Partner fixes the wrong title | Copy ID from QC Tracker |\n| No timestamp | Partner cannot reproduce | Add HH:MM:SS for each issue |\n| Wrong CTI | Ticket lands with the wrong team | Use the CTI in the issue's section |\n## Resolution\nCTI: Streaming Catalog → Partner → Redelivery Request."
  },
  {
    "id": "2.7",
    "title": "2.7 Daily Intake Workflow",
    "keywords": [
      "daily",
      "intake",
      "workflow",
      "queue",
      "sheet"
    ],
    "body": "Follow these steps at the start of every shift to build the day's QC queue.\n## Steps\nStep 1: Open the intake email and download the attached title list.\nStep 2: Paste the list into a new sheet and remove rows marked \"Cancelled\".\nStep 3: Remove duplicate Title IDs, keeping the row with the latest go-live date.\nStep 4: Compare against the tracking sheet and drop titles already QC'd this week.\nStep 5: Upload the remaining Title IDs to QC Tracker as today's batch.\nStep 6: Update the tracking sheet with the batch number and your name.\nNote: Titles with a go-live date within 48 hours go to the top of the queue."
  }
];

const EMBEDDED_IMAGES = {
  "img-ratios": {
    "contentType": "image/svg+xml",
    "dataBase64": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNzIwIDMwMCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSxzYW5zLXNlcmlmIj4KPHJlY3Qgd2lkdGg9IjcyMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmNGY0ZjgiLz4KPHJlY3QgeD0iMzAiIHk9IjYwIiB3aWR0aD0iMjcyIiBoZWlnaHQ9IjE1MyIgcng9IjEwIiBmaWxsPSIjNmQ1YmZmIi8+PHRleHQgeD0iMTY2IiB5PSIxNDIiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjE2Ojk8L3RleHQ+PHRleHQgeD0iMTY2IiB5PSIyNDUiIGZpbGw9IiMzYTNkNDgiIGZvbnQtc2l6ZT0iMTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVwaXNvZGUgLyBIZXJvPC90ZXh0Pgo8cmVjdCB4PSIzNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE4MCIgcng9IjEwIiBmaWxsPSIjMzljM2ZmIi8+PHRleHQgeD0iNDAwIiB5PSIxMzYiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjI6MzwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjI0NSIgZmlsbD0iIzNhM2Q0OCIgZm9udC1zaXplPSIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2Vhc29uIFBvc3RlcjwvdGV4dD4KPHJlY3QgeD0iNTAwIiB5PSI3MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIHJ4PSIxMCIgZmlsbD0iI2Y3YjUwMCIvPjx0ZXh0IHg9IjU3NSIgeT0iMTUxIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4xOjE8L3RleHQ+PHRleHQgeD0iNTc1IiB5PSIyNDUiIGZpbGw9IiMzYTNkNDgiIGZvbnQtc2l6ZT0iMTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNxdWFyZSBUaWxlPC90ZXh0Pgo8L3N2Zz4="
  },
  "img-safezone": {
    "contentType": "image/svg+xml",
    "dataBase64": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiB2aWV3Qm94PSIwIDAgNjQwIDM2MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSxzYW5zLXNlcmlmIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMmI1Y2ZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZiMzQ3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSJ1cmwoI2cpIi8+CjxyZWN0IHg9IjY0IiB5PSIzNiIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIyODgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtZGFzaGFycmF5PSIxMCA4Ii8+Cjx0ZXh0IHg9IjMyMCIgeT0iMTg2IiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TYWZlIHpvbmUgKDgwJSk8L3RleHQ+Cjx0ZXh0IHg9IjMyMCIgeT0iMzQ1IiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBvcGFjaXR5PSIuODUiPktlZXAgZmFjZXMgYW5kIHRpdGxlIHRleHQgaW5zaWRlIHRoZSBkYXNoZWQgYXJlYTwvdGV4dD4KPC9zdmc+"
  }
};

  function initAssistant() {

  GM_addStyle(`
    #${PANEL_ID}, #${PANEL_ID} * { box-sizing: border-box; }

    #${PANEL_ID} {
      pointer-events: none;
      color-scheme: light only;
      
      --ea-bg: #ffffff;
      --ea-surface: #f4f6f8;
      --ea-border: #e3e8ec;
      --ea-border-soft: #eef1f4;
      --ea-text: #0f171e;
      --ea-text-dim: #5c6b7a;
      --ea-accent: #0779ff;
      --ea-accent-2: #2f6bff;
      --ea-accent-hover: #0660d9;
      --ea-navy: #0f171e;
      --ea-navy-2: #232f3e;
      --ea-navy-grad: linear-gradient(135deg, #0f171e 0%, #1b2735 55%, #232f3e 100%);
      --ea-grad: linear-gradient(135deg, #0779ff 0%, #2f6bff 100%);
      --ea-user-bubble: linear-gradient(135deg, #0779ff, #0660d9);
      --ea-bot-bubble: #ffffff;
      --ea-ring: rgba(7, 121, 255, .18);
      --ea-shadow: 0 20px 60px -12px rgba(15, 23, 30, .4);
      --ea-shadow-sm: 0 2px 10px rgba(15, 23, 30, .08);
      --ea-radius: 20px;
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--ea-text);
      -webkit-font-smoothing: antialiased;
    }

    
    #ea-scrim {
      position: fixed; inset: 0; z-index: 2147483646;
      background: rgba(15, 16, 25, .28);
      backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
      opacity: 0; pointer-events: none;
      transition: opacity .28s ease;
    }
    #ea-scrim.ea-open { opacity: 1; pointer-events: auto; }

    
    #ea-launcher {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2147483645;
      width: 60px;
      height: 60px;
      border-radius: 20px;
      border: none;
      cursor: grab;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      pointer-events: auto;
      background: var(--ea-accent);
      box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      transition: left .2s ease, top .2s ease;
    }
    #ea-launcher.ea-dragging {
      cursor: grabbing;
      transition: none;
    }
    #ea-launcher .ea-launcher-label {
      color: #fff; font-size: 14px; font-weight: 800; letter-spacing: .04em;
      position: relative; display: block;
    }

    
    #ea-panel {
      position: fixed;
      top: 14px;
      right: 14px;
      bottom: 14px;
      z-index: 2147483647;
      pointer-events: none;
      width: 412px;
      max-width: calc(100vw - 28px);
      background: var(--ea-bg);
      box-shadow: var(--ea-shadow);
      border: 1px solid var(--ea-border);
      border-radius: var(--ea-radius);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: translateX(calc(100% + 24px));
      opacity: 0;
      transition: transform .34s cubic-bezier(.22,.61,.36,1), opacity .34s ease;
    }
    #ea-panel.ea-open { transform: translateX(0); opacity: 1; pointer-events: auto; }

    
    #ea-header {
      position: relative;
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 15px 16px;
      background: var(--ea-navy-grad);
      color: #fff;
    }
    
    #ea-header::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
      background: var(--ea-grad);
    }
    #ea-header .ea-logo {
      width: 44px; height: 36px; border-radius: 9px;
      background: var(--ea-accent);
      display: flex; align-items: center; justify-content: center;
      flex: 0 0 auto;
      padding: 6px 8px;
      box-shadow: 0 4px 12px -4px rgba(0,0,0,.35);
      color: #fff; font-size: 13px; font-weight: 800; letter-spacing: .03em;
    }
    #ea-header .ea-title { font-size: 15.5px; font-weight: 700; line-height: 1.15; letter-spacing: -.01em; }
    #ea-header .ea-spacer { flex: 1; }
    #ea-close {
      border: none; background: rgba(255,255,255,.16); color: #fff;
      width: 32px; height: 32px; border-radius: 10px; cursor: pointer;
      font-size: 19px; line-height: 1; display: flex; align-items: center; justify-content: center;
      transition: background .15s ease, transform .12s ease;
    }
    #ea-close:hover { background: rgba(255,255,255,.3); }
    #ea-close:active { transform: scale(.9); }

    
    #ea-messages {
      flex: 1;
      min-width: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 13px;
      background: var(--ea-surface);
    }
    #ea-messages::-webkit-scrollbar { width: 8px; }
    #ea-messages::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ea-text-dim) 32%, transparent); border-radius: 8px; }
    #ea-messages::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--ea-text-dim) 50%, transparent); }

    .ea-row { display: flex; min-width: 0; max-width: 100%; }
    .ea-row.ea-user { justify-content: flex-end; }
    .ea-row.ea-bot { justify-content: flex-start; width: 100%; }

    .ea-bubble {
      max-width: 84%;
      min-width: 0;
      padding: 11px 14px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.55;
      word-wrap: break-word;
      white-space: pre-wrap;
      animation: ea-pop .22s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes ea-pop { from { opacity: 0; transform: translateY(8px) scale(.98);} to { opacity: 1; transform: none; } }

    .ea-user .ea-bubble {
      background: var(--ea-user-bubble);
      color: #fff;
      border-bottom-right-radius: 5px;
      box-shadow: 0 6px 16px -6px rgba(7, 121, 255,.6);
    }
    .ea-bot .ea-bubble {
      background: var(--ea-bot-bubble);
      color: var(--ea-text);
      border: 1px solid var(--ea-border-soft);
      border-bottom-left-radius: 5px;
      box-shadow: var(--ea-shadow-sm);
    }

    
    .ea-bubble.ea-rich { max-width: 92%; overflow: hidden; }
    .ea-note { font-size: 11.5px; color: var(--ea-text-dim); margin-bottom: 7px; }
    .ea-sub { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--ea-text-dim); margin: 10px 0 3px; }
    .ea-list { margin: 3px 0; padding-left: 4px; list-style: none; }
    .ea-list li { margin: 4px 0; padding-left: 18px; position: relative; }
    .ea-list li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--ea-accent-2); }
    .ea-inline-link { color: var(--ea-accent); text-decoration: underline; text-underline-offset: 2px; }
    .ea-inline-link:hover { color: var(--ea-accent-hover); }
    .ea-related-label { font-size: 11.5px; font-weight: 600; color: var(--ea-text-dim); width: 100%; margin-bottom: 2px; }

    
    .ea-table-wrap {
      margin: 6px 0 10px; border: 1px solid var(--ea-border-soft); border-radius: 10px;
      width: 100%; max-width: 100%; min-width: 0;
      overflow-x: auto; overflow-y: auto;
      max-height: min(50vh, 420px);
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      touch-action: pan-x pan-y;
    }
    .ea-table-wrap::-webkit-scrollbar { height: 10px; width: 10px; }
    .ea-table-wrap::-webkit-scrollbar-thumb {
      background: color-mix(in srgb, var(--ea-text-dim) 45%, transparent); border-radius: 8px;
    }
    .ea-table-wrap::-webkit-scrollbar-thumb:hover {
      background: color-mix(in srgb, var(--ea-text-dim) 65%, transparent);
    }
    .ea-table {
      border-collapse: collapse; width: max-content; min-width: 100%;
      font-size: 12px; white-space: nowrap;
    }
    .ea-table th, .ea-table td {
      padding: 7px 10px; text-align: left;
      border-bottom: 1px solid var(--ea-border-soft);
      border-right: 1px solid var(--ea-border-soft);
    }
    .ea-table th:last-child, .ea-table td:last-child { border-right: none; }
    .ea-table thead th {
      background: var(--ea-surface); color: var(--ea-text-dim);
      font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
      border-bottom: 1px solid var(--ea-border);
    }
    .ea-table thead .ea-table-group-th { text-align: center; }
    .ea-table thead .ea-table-sub-th { border-top: 1px solid var(--ea-border-soft); }
    .ea-table tbody tr:last-child td { border-bottom: none; }
    .ea-table tbody tr:nth-child(even) { background: var(--ea-surface); }
    .ea-table-caption {
      font-size: 11.5px; font-weight: 700; color: var(--ea-text);
      margin: 0 0 5px;
    }
    .ea-table-img-cell { padding: 6px; white-space: normal; }
    .ea-table-img { display: block; max-width: 220px; max-height: 140px; border-radius: 6px; }
    .ea-table-img-loading { font-size: 11px; color: var(--ea-text-dim); font-style: italic; }
    .ea-table-img-loading.ea-table-img-error { color: #d64545; font-style: normal; }
    .ea-image-block .ea-table-img { max-width: 100%; max-height: 260px; border: 1px solid var(--ea-border-soft); }

    
    .ea-tldr {
      font-size: 13.5px; line-height: 1.55; margin-bottom: 4px;
      padding: 9px 11px; border-radius: 10px;
      background: rgba(7, 121, 255, .07);
      border-left: 3px solid var(--ea-accent);
    }
    #ea-panel .ea-toggle {
      display: flex; align-items: center; justify-content: space-between; width: 100%;
      margin-top: 8px; padding: 9px 12px;
      background: var(--ea-surface); border: 1px solid var(--ea-border-soft);
      border-radius: 10px; cursor: pointer;
      font-family: inherit; font-size: 12.5px; font-weight: 650; color: var(--ea-text) !important;
      transition: background .15s ease, border-color .15s ease;
    }
    #ea-panel .ea-toggle:hover { background: rgba(7, 121, 255, .07); border-color: var(--ea-accent); color: var(--ea-text) !important; }
    .ea-toggle svg { width: 16px; height: 16px; fill: var(--ea-text-dim); flex: 0 0 auto; transition: transform .18s ease; }
    .ea-toggle.ea-expanded svg { transform: rotate(180deg); }
    .ea-toggle-panel { padding: 6px 2px 2px; min-width: 0; max-width: 100%; overflow: hidden; }

    
    .ea-cti-block {
      margin: 8px 0; padding: 9px 11px; border-radius: 10px;
      background: rgba(255, 149, 0, .08); border-left: 3px solid #ff9500;
      font-size: 13px; line-height: 1.5;
    }
    .ea-cti-label {
      font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em;
      color: #ff9500; margin-bottom: 3px;
    }
    .ea-cti-line { display: flex; gap: 4px; }
    .ea-cti-letter { font-weight: 700; color: #ff9500; flex: 0 0 auto; }
    .ea-cti-value { color: var(--ea-text); }

    
    .ea-mrcd-block {
      margin: 8px 0; padding: 9px 11px; border-radius: 10px;
      background: rgba(7, 121, 255, .06); border-left: 3px solid var(--ea-accent);
      font-size: 13px; line-height: 1.5;
    }
    .ea-mrcd-label {
      font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em;
      color: var(--ea-accent); margin-bottom: 3px;
    }

    
    #ea-suggestions {
      display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
    }
    #ea-panel .ea-chip {
      border: 1px solid var(--ea-border);
      background: var(--ea-bg) !important;
      color: var(--ea-text) !important;
      padding: 8px 13px; border-radius: 999px; font-size: 12px; font-weight: 500; cursor: pointer;
      box-shadow: var(--ea-shadow-sm);
      transition: border-color .15s ease, color .15s ease, transform .12s ease, background .15s ease;
    }
    #ea-panel .ea-chip:hover { border-color: var(--ea-accent); background: var(--ea-bg) !important; color: var(--ea-accent) !important; transform: translateY(-1px); }
    #ea-panel .ea-chip:active { transform: translateY(0) scale(.97); }

    
    .ea-typing-row { display: flex; align-items: center; gap: 8px; }
    .ea-typing-label { font-size: 12px; color: var(--ea-text-dim); }
    .ea-typing { display: inline-flex; gap: 4px; align-items: center; padding: 2px 0; }
    .ea-typing span {
      width: 7px; height: 7px; border-radius: 50%; background: var(--ea-accent-2);
      animation: ea-blink 1.2s infinite ease-in-out;
    }
    .ea-typing span:nth-child(2) { animation-delay: .2s; }
    .ea-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes ea-blink { 0%, 80%, 100% { opacity: .25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }

    
    #ea-messages.ea-empty-mode { justify-content: center; align-items: center; padding: 24px; }
    .ea-empty {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      max-width: 320px; margin: auto; animation: ea-pop .3s ease;
    }
    .ea-empty-logo {
      width: 96px; height: 72px; border-radius: 16px; background: var(--ea-accent);
      display: flex; align-items: center; justify-content: center; padding: 14px 18px;
      box-shadow: 0 10px 30px -10px rgba(7, 121, 255,.5);
      margin-bottom: 18px;
      color: #fff; font-size: 20px; font-weight: 800; letter-spacing: .04em;
    }
    .ea-empty-title { margin: 0 0 6px; font-size: 19px; font-weight: 750; letter-spacing: -.01em; color: var(--ea-text); }
    .ea-empty-sub { margin: 0 0 20px; font-size: 13.5px; line-height: 1.55; color: var(--ea-text-dim); }
    .ea-empty-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }

    
    #ea-suggest-pop {
      position: absolute; left: 13px; right: 13px; bottom: calc(100% - 4px);
      background: var(--ea-bg); border: 1px solid var(--ea-border);
      border-radius: 14px; box-shadow: var(--ea-shadow);
      max-height: 260px; overflow-y: auto; z-index: 6;
      display: none; padding: 5px;
    }
    #ea-suggest-pop.ea-show { display: block; animation: ea-pop .14s ease; }
    #ea-suggest-pop::-webkit-scrollbar { width: 7px; }
    #ea-suggest-pop::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ea-text-dim) 32%, transparent); border-radius: 8px; }
    .ea-suggest-item {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 8px 11px; border-radius: 10px; cursor: pointer;
      font-size: 13px; color: var(--ea-text);
    }
    .ea-suggest-item.ea-active { background: rgba(7, 121, 255, .1); }
    .ea-suggest-item .ea-si-icon { width: 16px; height: 16px; margin-top: 2px; fill: var(--ea-text-dim); flex: 0 0 auto; }
    .ea-suggest-item.ea-active .ea-si-icon { fill: var(--ea-accent); }
    .ea-si-body { min-width: 0; flex: 1; }
    .ea-si-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ea-si-meta {
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-size: 11px; color: var(--ea-text-dim); margin-top: 2px;
    }
    .ea-si-kw { color: var(--ea-accent); font-weight: 600; }
    .ea-suggest-hl { color: var(--ea-accent); font-weight: 700; }
    .ea-suggest-empty { padding: 14px 12px; font-size: 13px; color: var(--ea-text-dim); text-align: center; }

    
    #ea-input-wrap {
      position: relative;
      border-top: 1px solid var(--ea-border-soft);
      padding: 13px 13px 11px;
      background: var(--ea-bg);
    }
    #ea-input-box {
      display: flex; align-items: center; gap: 7px;
      border: 1.5px solid var(--ea-border);
      border-radius: 16px;
      padding: 7px 7px 7px 14px;
      background: var(--ea-surface);
      transition: border-color .18s ease, box-shadow .18s ease;
    }
    #ea-input-box:focus-within {
      border-color: var(--ea-accent);
      box-shadow: 0 0 0 4px var(--ea-ring);
    }
    #ea-input {
      flex: 1; border: none; outline: none; resize: none;
      font-family: inherit; font-size: 13.5px; line-height: 1.5;
      max-height: 120px; background: transparent; color: var(--ea-text);
      padding: 5px 0;
    }
    #ea-input::placeholder { color: var(--ea-text-dim); }

    
    .ea-iconbtn {
      flex: 0 0 auto;
      width: 38px; height: 38px; border-radius: 12px; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      padding: 0;
      transition: background .15s ease, transform .12s ease, color .15s ease, box-shadow .15s ease;
    }
    #ea-send {
      background: var(--ea-accent);
      box-shadow: 0 4px 12px -3px rgba(7, 121, 255, .55);
    }
    #ea-send:disabled {
      background: var(--ea-border);
      box-shadow: none;
      cursor: default;
    }
    #ea-send:disabled svg { fill: var(--ea-text-dim); }
    #ea-send:not(:disabled):hover { background: var(--ea-accent-hover); transform: translateY(-1px); }
    #ea-send:not(:disabled):active { transform: scale(.92); }
    #ea-send svg { width: 19px; height: 19px; fill: #fff; display: block; }
    #ea-foot { text-align: center; font-size: 10.5px; color: var(--ea-text-dim); margin-top: 9px; }

    
    #ea-lightbox {
      position: fixed; inset: 0; z-index: 2147483647;
      background: rgba(10, 12, 16, .92);
      display: none;
      flex-direction: column;
      align-items: center; justify-content: center;
      
      pointer-events: auto;
    }
    #ea-lightbox.ea-open { display: flex; }
    #ea-lightbox-stage {
      flex: 1 1 auto; width: 100%;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; cursor: grab; touch-action: none;
    }
    #ea-lightbox-stage.ea-dragging { cursor: grabbing; }
    #ea-lightbox-img {
      max-width: 92vw; max-height: 78vh;
      user-select: none; -webkit-user-select: none;
      transform-origin: center center;
      transition: transform .08s ease-out;
      box-shadow: 0 20px 60px -12px rgba(0, 0, 0, .6);
      border-radius: 4px;
    }
    #ea-lightbox-caption {
      color: #fff; font-size: 13.5px; line-height: 1.5; text-align: center;
      max-width: 80vw; padding: 12px 16px 20px;
      flex: 0 0 auto;
    }
    #ea-lightbox-close, #ea-lightbox-prev, #ea-lightbox-next {
      position: fixed; z-index: 2147483647;
      background: rgba(255, 255, 255, .12); color: #fff; border: none;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background .15s ease;
    }
    #ea-lightbox-close:hover, #ea-lightbox-prev:hover, #ea-lightbox-next:hover { background: rgba(255, 255, 255, .22); }
    #ea-lightbox-close {
      top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%;
      font-size: 22px; line-height: 1; font-family: inherit;
    }
    #ea-lightbox-prev, #ea-lightbox-next {
      top: 50%; transform: translateY(-50%);
      width: 44px; height: 44px; border-radius: 50%;
      font-size: 26px; line-height: 1; font-family: inherit;
    }
    #ea-lightbox-prev { left: 16px; }
    #ea-lightbox-next { right: 16px; }
    #ea-lightbox-prev[hidden], #ea-lightbox-next[hidden] { display: none; }
  `);

  const root = document.createElement('div');
  root.id = PANEL_ID;
  root.innerHTML = `
    <div id="ea-scrim"></div>

    <button id="ea-launcher" title="Open SOP Assistant" aria-label="Open SOP Assistant">
      <span class="ea-launcher-label">SOP</span>
    </button>

    <section id="ea-panel" role="dialog" aria-label="SOP Assistant" aria-hidden="true">
      <header id="ea-header">
        <div class="ea-logo">SOP</div>
        <div>
          <div class="ea-title">SOP Assistant</div>
        </div>
        <div class="ea-spacer"></div>
        <button id="ea-close" title="Close" aria-label="Close">&times;</button>
      </header>

      <div id="ea-messages"></div>

      <div id="ea-input-wrap">
        <div id="ea-suggest-pop" role="listbox"></div>
        <div id="ea-input-box">
          <textarea id="ea-input" rows="1" placeholder="Ask a question…"></textarea>
          <button id="ea-send" class="ea-iconbtn" title="Send" aria-label="Send" disabled>
            <svg viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
        <div id="ea-foot">Answers come from the SOP</div>
      </div>
    </section>

    <div id="ea-lightbox" aria-hidden="true">
      <button id="ea-lightbox-close" type="button" title="Close" aria-label="Close">&times;</button>
      <button id="ea-lightbox-prev" type="button" title="Previous image" aria-label="Previous image">&#8249;</button>
      <button id="ea-lightbox-next" type="button" title="Next image" aria-label="Next image">&#8250;</button>
      <div id="ea-lightbox-stage">
        <img id="ea-lightbox-img" alt="" draggable="false" />
      </div>
      <div id="ea-lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(root);

  const launcher = root.querySelector('#ea-launcher');
  const scrim = root.querySelector('#ea-scrim');
  const panel = root.querySelector('#ea-panel');
  const closeBtn = root.querySelector('#ea-close');
  const messages = root.querySelector('#ea-messages');
  const input = root.querySelector('#ea-input');
  const sendBtn = root.querySelector('#ea-send');
  const suggestPop = root.querySelector('#ea-suggest-pop');
  const inputFoot = root.querySelector('#ea-foot');
  const lightbox = root.querySelector('#ea-lightbox');
  const lightboxStage = root.querySelector('#ea-lightbox-stage');
  const lightboxImg = root.querySelector('#ea-lightbox-img');
  const lightboxCaption = root.querySelector('#ea-lightbox-caption');
  const lightboxCloseBtn = root.querySelector('#ea-lightbox-close');
  const lightboxPrevBtn = root.querySelector('#ea-lightbox-prev');
  const lightboxNextBtn = root.querySelector('#ea-lightbox-next');
  const DEFAULT_PLACEHOLDER = input.getAttribute('placeholder');
  input.disabled = true;
  input.placeholder = 'Loading SOP content…';

  const LAUNCHER_MARGIN = 20;
  const LAUNCHER_STORAGE_KEY = 'sop-assistant-launcher-pos';
  const DRAG_THRESHOLD = 5;

  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;
  let dragMoved = false;

  function getLauncherBounds() {
    const rect = launcher.getBoundingClientRect();
    const width = rect.width || 60;
    const height = rect.height || 60;
    const maxX = Math.max(LAUNCHER_MARGIN, window.innerWidth - width - LAUNCHER_MARGIN);
    const maxY = Math.max(LAUNCHER_MARGIN, window.innerHeight - height - LAUNCHER_MARGIN);
    return { width, height, minX: LAUNCHER_MARGIN, minY: LAUNCHER_MARGIN, maxX, maxY };
  }

  function clampLauncherPosition(x, y) {
    const b = getLauncherBounds();
    return {
      x: Math.min(Math.max(x, b.minX), b.maxX),
      y: Math.min(Math.max(y, b.minY), b.maxY),
    };
  }

  function applyLauncherPosition(x, y, animate) {
    const pos = clampLauncherPosition(Math.round(x), Math.round(y));
    launcher.style.left = pos.x + 'px';
    launcher.style.top = pos.y + 'px';
    if (animate) {
      void launcher.offsetWidth;
    }
    return pos;
  }

  function defaultLauncherPosition() {
    const b = getLauncherBounds();
    return {
      x: b.maxX,
      y: Math.round((window.innerHeight - b.height) / 2),
    };
  }

  function loadLauncherPosition() {
    try {
      const raw = localStorage.getItem(LAUNCHER_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
        return parsed;
      }
    } catch (_) {}
    return null;
  }

  function saveLauncherPosition(x, y) {
    try {
      localStorage.setItem(LAUNCHER_STORAGE_KEY, JSON.stringify({ x, y }));
    } catch (_) {}
  }

  function snapLauncherToNearestEdge(x, y) {
    const b = getLauncherBounds();
    const pos = clampLauncherPosition(x, y);
    const distLeft = pos.x - b.minX;
    const distRight = b.maxX - pos.x;
    const distTop = pos.y - b.minY;
    const distBottom = b.maxY - pos.y;
    const min = Math.min(distLeft, distRight, distTop, distBottom);

    if (min === distLeft) return { x: b.minX, y: pos.y };
    if (min === distRight) return { x: b.maxX, y: pos.y };
    if (min === distTop) return { x: pos.x, y: b.minY };
    return { x: pos.x, y: b.maxY };
  }

  function initLauncherPosition() {
    const saved = loadLauncherPosition();
    const start = saved || defaultLauncherPosition();
    applyLauncherPosition(start.x, start.y, false);
  }

  function readLauncherPosition() {
    return clampLauncherPosition(
      parseFloat(launcher.style.left) || 0,
      parseFloat(launcher.style.top) || 0
    );
  }

  function onLauncherPointerDown(e) {
    if (e.button !== 0) return;
    const pos = readLauncherPosition();
    dragPointerId = e.pointerId;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragOriginX = pos.x;
    dragOriginY = pos.y;
    dragMoved = false;
    launcher.classList.add('ea-dragging');
    launcher.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onLauncherPointerMove(e) {
    if (dragPointerId !== e.pointerId) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    if (!dragMoved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    dragMoved = true;
    applyLauncherPosition(dragOriginX + dx, dragOriginY + dy, false);
  }

  function finishLauncherPointer(e) {
    if (dragPointerId !== e.pointerId) return;
    launcher.classList.remove('ea-dragging');
    try { launcher.releasePointerCapture(e.pointerId); } catch (_) {}
    const wasDrag = dragMoved;
    dragPointerId = null;
    dragMoved = false;

    if (wasDrag) {
      const current = readLauncherPosition();
      const snapped = snapLauncherToNearestEdge(current.x, current.y);
      const finalPos = applyLauncherPosition(snapped.x, snapped.y, true);
      saveLauncherPosition(finalPos.x, finalPos.y);
      return;
    }
    openPanel();
  }

  initLauncherPosition();
  launcher.addEventListener('pointerdown', onLauncherPointerDown);
  launcher.addEventListener('pointermove', onLauncherPointerMove);
  launcher.addEventListener('pointerup', finishLauncherPointer);
  launcher.addEventListener('pointercancel', finishLauncherPointer);
  function onViewportChange() {
    const current = readLauncherPosition();
    const clamped = clampLauncherPosition(current.x, current.y);
    applyLauncherPosition(clamped.x, clamped.y, false);
    saveLauncherPosition(clamped.x, clamped.y);
  }
  window.addEventListener('resize', onViewportChange, { passive: true });
  window.addEventListener('orientationchange', onViewportChange, { passive: true });

  const SUGGESTIONS = [
    'Offer missing',
    'Rating missing',
    'Audio video out of sync',
    'Subtitle out of sync',
    'Redelivery ticket validation',
  ];

  const STOP_WORDS = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'of', 'in', 'on', 'for',
    'and', 'or', 'do', 'does', 'how', 'what', 'where', 'when', 'why', 'who', 'can',
    'i', 'my', 'me', 'we', 'our', 'you', 'your', 'about', 'get', 'there', 'it',
    'with', 'this', 'that', 'from', 'at', 'by', 'be', 'as', 'if', 'any',
  ]);

  function tokenize(text) {
    return (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
      (w) => w.length > 1 && !STOP_WORDS.has(w)
    );
  }

  const SEARCH_SYNONYMS = {
    subtitle: ['subtitles', 'caption', 'captions', 'closed caption', 'cc'],
    rating: ['ratings', 'age rating', 'content rating', 'maturity rating'],
    language: ['audio language', 'spoken language', 'original language', 'dialog language'],
  };

  const SYNONYM_MAX_TERMS_PER_KEYWORD = 10;

  function expandQueryTokens(tokens) {
    const seen = new Set(tokens);
    const expanded = tokens.slice();
    tokens.forEach((token) => {
      const synonyms = SEARCH_SYNONYMS[token];
      if (!synonyms) return;
      synonyms.slice(0, SYNONYM_MAX_TERMS_PER_KEYWORD).forEach((phrase) => {
        tokenize(phrase).forEach((synToken) => {
          if (seen.has(synToken)) return;
          seen.add(synToken);
          expanded.push(synToken);
        });
      });
    });
    return expanded;
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function plainTitle(section) {
    return section.title.replace(/^[\d.]+\s*/, '').toLowerCase();
  }

  function countWordMatches(text, tok) {
    const re = new RegExp('\\b' + escapeRe(tok), 'g');
    const m = text.match(re);
    return m ? m.length : 0;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    const m = a.length;
    const n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
      }
      prev = cur;
    }
    return prev[n];
  }

  function isFuzzyHit(word, tok) {
    if (tok.length < 4 || Math.abs(word.length - tok.length) > 2) return false;
    const maxDist = tok.length <= 5 ? 1 : 2;
    return levenshtein(word, tok) <= maxDist;
  }

  function wordMatchStrength(text, tok) {
    if (countWordMatches(text, tok) > 0) return 2;
    const words = text.split(/[^a-z0-9]+/).filter(Boolean);
    if (words.some((w) => isFuzzyHit(w, tok))) return 1;
    return 0;
  }

  const SOP_NAME = 'Streaming Catalog QC SOP';
  const CHUNK_MIN_WORDS = 300;
  const CHUNK_MAX_WORDS = 500;

  const STANDALONE_IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

  function countWords(text) {
    return (text.match(/\S+/g) || []).length;
  }

  function parseBlocks(bodyText) {
    const lines = bodyText.split('\n').map((l) => l.trim()).filter(Boolean);
    const isListLine = (l) => l.startsWith('- ') || /^\d+[.)]\s/.test(l) || /^(case|step)\s*\d+\s*:/i.test(l);
    const isCtiLine = (l) => /\bcti\b/i.test(l) && !l.startsWith('## ');
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith('|') && line.endsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].startsWith('|') && lines[i].endsWith('|')) {
          rows.push(lines[i]);
          i += 1;
        }
        blocks.push({ type: 'table', lines: rows });
      } else if (line.startsWith('## ')) {
        blocks.push({ type: 'heading', lines: [line] });
        i += 1;
      } else if (isListLine(line)) {
        const group = [];
        while (i < lines.length && isListLine(lines[i])) {
          group.push(lines[i]);
          i += 1;
        }
        blocks.push({ type: 'list', lines: group });
      } else if (isCtiLine(line)) {
        const group = [];
        while (i < lines.length && isCtiLine(lines[i])) {
          group.push(lines[i]);
          i += 1;
        }
        blocks.push({ type: 'cti', lines: group });
      } else if (STANDALONE_IMAGE_LINE_RE.test(line)) {
        blocks.push({ type: 'image', lines: [line] });
        i += 1;
      } else {
        blocks.push({ type: 'para', lines: [line] });
        i += 1;
      }
    }
    return blocks;
  }

  function chunkSection(section) {
    const blocks = parseBlocks(section.body);
    const chunks = [];
    let current = [];
    let currentWords = 0;
    let subheading = '';
    let chunkStartSubheading = '';

    const flush = () => {
      if (!current.length) return;
      chunks.push({
        id: `${section.id}::c${chunks.length + 1}`,
        sopName: section.sopName || SOP_NAME,
        page: section.id,
        sectionHeading: section.title,
        subheading: chunkStartSubheading,
        content: current.map((b) => b.lines.join('\n')).join('\n'),
        wordCount: currentWords,

        keywords: section.keywords || [],
        aliases: section.aliases || [],
      });
      current = [];
      currentWords = 0;
    };

    blocks.forEach((block) => {
      if (block.type === 'heading') subheading = block.lines[0].slice(3);
      const words = countWords(block.lines.join(' '));
      if (current.length && currentWords + words > CHUNK_MAX_WORDS && currentWords >= CHUNK_MIN_WORDS) {
        flush();
      }
      if (!current.length) chunkStartSubheading = subheading;
      current.push(block);
      currentWords += words;
    });
    flush();

    return chunks;
  }

  function stem(word) {
    if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
    return word;
  }

  function stemTokens(tokens) {
    return tokens.map(stem);
  }

  function buildChunkIndex() {
    const chunks = SOP.flatMap((section) => chunkSection(section));
    const termFreqs = chunks.map((chunk) => {
      const tf = new Map();
      stemTokens(tokenize(chunk.content)).forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
      return tf;
    });
    const lengths = termFreqs.map((tf) => {
      let total = 0;
      for (const c of tf.values()) total += c;
      return total;
    });
    const df = new Map();
    termFreqs.forEach((tf) => {
      for (const term of tf.keys()) df.set(term, (df.get(term) || 0) + 1);
    });
    const N = chunks.length;
    const avgLen = lengths.reduce((a, b) => a + b, 0) / (N || 1);

    const idf = new Map();
    for (const [term, freq] of df.entries()) idf.set(term, Math.log(1 + N / freq));

    const vectors = termFreqs.map((tf) => {
      const vec = new Map();
      let normSq = 0;
      for (const [term, freq] of tf.entries()) {
        const w = freq * (idf.get(term) || 0);
        vec.set(term, w);
        normSq += w * w;
      }
      return { vec, norm: Math.sqrt(normSq) || 1 };
    });

    return { chunks, termFreqs, lengths, df, idf, avgLen, N, vectors };
  }

  let CHUNK_INDEX = null;
  function getChunkIndex() {
    if (!CHUNK_INDEX) CHUNK_INDEX = buildChunkIndex();
    return CHUNK_INDEX;
  }

  function resetSearchIndexes() {
    CHUNK_INDEX = null;
    SUGGEST_INDEX = null;
    SOP_BY_ID = null;
    COMPREHENSIVE_INDEX = null;
  }

  let SOP_BY_ID = null;
  function getSopById() {
    if (!SOP_BY_ID) SOP_BY_ID = new Map(SOP.map((s) => [s.id, s]));
    return SOP_BY_ID;
  }

  const INDEX_ITEM_TYPES = Object.freeze({
    TITLE: 'title',
    HEADING: 'heading',
    SUBHEADING: 'subheading',
    BULLET_HEADING: 'bulletHeading',
    TABLE: 'table',
    TABLE_CAPTION: 'tableCaption',
    TABLE_HEADER: 'tableHeader',
    METADATA_FIELD: 'metadataField',
    CTI: 'cti',
    RULE: 'rule',
    EXCEPTION_HEADING: 'exceptionHeading',
    NOTE: 'note',
    IMAGE_CAPTION: 'imageCaption',
    RELATED_TOPIC: 'relatedTopic',
    KEYWORD: 'keyword',
    NEGATIVE_KEYWORD: 'negativeKeyword',
  });

  function makeIndexItem(type, text, section) {
    return { type, text, sectionId: section.id, sectionTitle: section.title };
  }

  const HEADING_LINE_RE = /^(#{2,6})\s+(.+)$/;
  const LIST_LINE_RE = /^(?:-\s+|\d+[.)]\s+|(?:case|step)\s*\d+\s*:)/i;
  const CASE_STEP_LINE_RE = /(?:^|:\s*)(case|step)\s*\d+\s*:/i;
  const IF_THEN_LINE_RE = /\bif\b.*\bthen\b/i;
  const EXCEPTION_LINE_RE = /^(?:-\s+|\d+[.)]\s+)?exceptions?\b/i;
  const NOTE_LINE_RE = /^(?:-\s+|\d+[.)]\s+)?notes?\b/i;
  const LABEL_BULLET_RE = /^(?:-\s+|\d+[.)]\s+)(.{1,40}):\s*$/;
  const CTI_LINE_RE = /\bcti\b/i;
  const METADATA_FIELD_RE = /^([A-Za-z][A-Za-z0-9 /_-]{1,40}):\s+(.+)$/;

  function indexSectionBody(section, items) {
    const lines = (section.body || '').split('\n').map((l) => l.trim()).filter(Boolean);

    let lastHeadingText = section.title;
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('|') && line.endsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].startsWith('|') && lines[i].endsWith('|')) {
          rows.push(lines[i]);
          i += 1;
        }
        items.push(makeIndexItem(INDEX_ITEM_TYPES.TABLE, rows.join('\n'), section));
        items.push(makeIndexItem(INDEX_ITEM_TYPES.TABLE_CAPTION, lastHeadingText, section));
        const headerRow = rows.find((r) => !isTableSeparatorRow(r));
        if (headerRow) {
          items.push(makeIndexItem(INDEX_ITEM_TYPES.TABLE_HEADER, splitTableRow(headerRow).join(' | '), section));
        }
        continue;
      }

      const headingMatch = line.match(HEADING_LINE_RE);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        items.push(makeIndexItem(level === 2 ? INDEX_ITEM_TYPES.HEADING : INDEX_ITEM_TYPES.SUBHEADING, text, section));
        lastHeadingText = text;
        i += 1;
        continue;
      }

      if (LIST_LINE_RE.test(line)) {
        if (EXCEPTION_LINE_RE.test(line)) items.push(makeIndexItem(INDEX_ITEM_TYPES.EXCEPTION_HEADING, line, section));
        else if (NOTE_LINE_RE.test(line)) items.push(makeIndexItem(INDEX_ITEM_TYPES.NOTE, line, section));
        else if (CASE_STEP_LINE_RE.test(line) || IF_THEN_LINE_RE.test(line)) items.push(makeIndexItem(INDEX_ITEM_TYPES.RULE, line, section));
        else if (LABEL_BULLET_RE.test(line)) items.push(makeIndexItem(INDEX_ITEM_TYPES.BULLET_HEADING, line, section));
        i += 1;
        continue;
      }

      if (CTI_LINE_RE.test(line)) {
        items.push(makeIndexItem(INDEX_ITEM_TYPES.CTI, line, section));
        i += 1;
        continue;
      }

      if (STANDALONE_IMAGE_LINE_RE.test(line)) {
        const m = line.match(STANDALONE_IMAGE_LINE_RE);
        if (m && m[1]) items.push(makeIndexItem(INDEX_ITEM_TYPES.IMAGE_CAPTION, m[1], section));
        i += 1;
        continue;
      }

      const metaMatch = line.match(METADATA_FIELD_RE);
      if (metaMatch) items.push(makeIndexItem(INDEX_ITEM_TYPES.METADATA_FIELD, line, section));
      i += 1;
    }
  }

  function buildComprehensiveIndex() {
    const items = [];
    SOP.forEach((section) => {
      items.push(makeIndexItem(INDEX_ITEM_TYPES.TITLE, section.title, section));
      (section.keywords || []).forEach((k) => items.push(makeIndexItem(INDEX_ITEM_TYPES.KEYWORD, k, section)));
      (section.negativeKeywords || []).forEach((k) => items.push(makeIndexItem(INDEX_ITEM_TYPES.NEGATIVE_KEYWORD, k, section)));
      (section.relatedTopics || []).forEach((rt) => {
        const text = typeof rt === 'string' ? rt : ((rt && (rt.title || rt.id)) || '');
        if (text) items.push(makeIndexItem(INDEX_ITEM_TYPES.RELATED_TOPIC, text, section));
      });
      indexSectionBody(section, items);
    });

    const byType = new Map();
    const bySection = new Map();
    items.forEach((item) => {
      if (!byType.has(item.type)) byType.set(item.type, []);
      byType.get(item.type).push(item);
      if (!bySection.has(item.sectionId)) bySection.set(item.sectionId, []);
      bySection.get(item.sectionId).push(item);
    });

    return { items, byType, bySection, N: items.length };
  }

  let COMPREHENSIVE_INDEX = null;
  function getComprehensiveIndex() {
    if (!COMPREHENSIVE_INDEX) COMPREHENSIVE_INDEX = buildComprehensiveIndex();
    return COMPREHENSIVE_INDEX;
  }

  const BM25_K1 = 1.5;
  const BM25_B = 0.75;

  function bm25ScoreForChunk(queryTokens, idx, i) {
    const tf = idx.termFreqs[i];
    const len = idx.lengths[i];
    let score = 0;
    queryTokens.forEach((term) => {
      const f = tf.get(term) || 0;
      if (!f) return;
      const df = idx.df.get(term) || 0;
      if (!df) return;
      const idfVal = Math.log(1 + (idx.N - df + 0.5) / (df + 0.5));
      const denom = f + BM25_K1 * (1 - BM25_B + BM25_B * (len / idx.avgLen));
      score += idfVal * ((f * (BM25_K1 + 1)) / denom);
    });
    return score;
  }

  function cosineScoreForChunk(queryTokens, idx, i) {
    const qtf = new Map();
    queryTokens.forEach((t) => qtf.set(t, (qtf.get(t) || 0) + 1));
    let dot = 0;
    let qNormSq = 0;
    for (const [term, freq] of qtf.entries()) {
      const w = freq * (idx.idf.get(term) || 0);
      qNormSq += w * w;
      const chunkWeight = idx.vectors[i].vec.get(term);
      if (chunkWeight) dot += w * chunkWeight;
    }
    const qNorm = Math.sqrt(qNormSq) || 1;
    return dot / (qNorm * idx.vectors[i].norm);
  }

  function isTitleMatch(sectionHeading, queryTokens) {
    if (!queryTokens.length) return false;
    const titleTokens = new Set(tokenize(sectionHeading.replace(/^[\d.]+\s*/, '')));
    return queryTokens.every((t) => titleTokens.has(t));
  }

  function titleExtraWordCount(sectionHeading, queryTokens) {
    const titleTokens = tokenize(sectionHeading.replace(/^[\d.]+\s*/, ''));
    return titleTokens.filter((t) => !queryTokens.includes(t)).length;
  }

  function titleCoverageRatio(titleTokens, queryTokens) {
    if (!queryTokens.length) return 0;
    let score = 0;
    queryTokens.forEach((qt) => {
      if (titleTokens.includes(qt)) score += 1;
      else if (titleTokens.some((tt) => isFuzzyHit(tt, qt))) score += 0.5;
    });
    return score / queryTokens.length;
  }

  const TITLE_MATCH_MIN_COVERAGE = 0.5;

  const TITLE_SYNONYMS = {
    'Title Name Validation': ['movie title', 'title', 'show name'],
    'Artwork': ['poster', 'thumbnail', 'cover image'],
    'Original Language': ['spoken language'],
  };

  const TITLE_SYNONYM_MAX_ALIASES = 10;

  function queryCoversAliasPhrase(queryTokens, aliasTokens) {
    return aliasTokens.length > 0 && aliasTokens.every((t) => queryTokens.includes(t));
  }

  function expandQueryWithTitleSynonyms(queryTokens) {
    const seen = new Set(queryTokens);
    const expanded = queryTokens.slice();
    Object.keys(TITLE_SYNONYMS).forEach((canonicalTitle) => {
      const aliases = TITLE_SYNONYMS[canonicalTitle].slice(0, TITLE_SYNONYM_MAX_ALIASES);
      const matched = aliases.some((phrase) => queryCoversAliasPhrase(queryTokens, tokenize(phrase)));
      if (!matched) return;
      tokenize(canonicalTitle).forEach((t) => {
        if (seen.has(t)) return;
        seen.add(t);
        expanded.push(t);
      });
    });
    return expanded;
  }

  const QUERY_ABBREVIATIONS = {
    cc: 'closed caption',
    subs: 'subtitle',
    lang: 'language',
  };

  function normalizeQueryForTitleSearch(query) {
    const words = (query || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const expanded = words.flatMap((w) => {
      const phrase = QUERY_ABBREVIATIONS[w];
      return phrase ? phrase.split(' ') : [w];
    });
    return expanded.map(stem).join(' ');
  }

  function findTitleMatchedSectionIds(query) {
    const queryTokens = tokenize(normalizeQueryForTitleSearch(query));
    if (!queryTokens.length) return [];

    const titleSearchTokens = expandQueryWithTitleSynonyms(queryTokens);
    return SOP
      .filter((section) => {
        const titleTokens = tokenize(section.title.replace(/^[\d.]+\s*/, ''));
        return titleCoverageRatio(titleTokens, titleSearchTokens) >= TITLE_MATCH_MIN_COVERAGE;
      })
      .map((section) => section.id);
  }

  function titleFirstRetrieval(query) {
    const ranked = hybridSearch(query);
    const titleSectionIds = findTitleMatchedSectionIds(query);
    if (!titleSectionIds.length) return ranked;
    const idSet = new Set(titleSectionIds);
    const scoped = ranked.filter((r) => idSet.has(r.chunk.page));

    if (scoped.length) {
      if (ranked[0] && ranked[0].tier < scoped[0].tier) return ranked;
      return scoped;
    }

    const idx = getChunkIndex();
    const directChunks = idx.chunks
      .filter((c) => idSet.has(c.page))
      .map((chunk) => ({
        chunk,
        bm25: 0,
        cosine: 0,
        tier: 0,
        titleExtraWords: 0,
        searchType: 'title',
        foundBy: new Set(['title']),
        combined: 0,
      }));

    return directChunks.length ? directChunks : ranked;
  }

  function topResultTitleSignals(query, top) {
    if (!top) return { titleMatched: false, exactTitleMatch: false, synonymMatch: false };

    const titleTokens = tokenize(top.chunk.sectionHeading.replace(/^[\d.]+\s*/, ''));
    const rawTokens = tokenize(normalizeQueryForTitleSearch(query));
    const rawCoverage = titleCoverageRatio(titleTokens, rawTokens);
    const expandedCoverage = titleCoverageRatio(titleTokens, expandQueryWithTitleSynonyms(rawTokens));

    const exactTitleMatch = rawCoverage === 1 && titleTokens.every((t) => rawTokens.includes(t));
    const titleMatched = exactTitleMatch
      || rawCoverage >= TITLE_MATCH_MIN_COVERAGE
      || expandedCoverage >= TITLE_MATCH_MIN_COVERAGE;
    const synonymMatch = !exactTitleMatch
      && rawCoverage < TITLE_MATCH_MIN_COVERAGE
      && expandedCoverage >= TITLE_MATCH_MIN_COVERAGE;

    return { titleMatched, exactTitleMatch, synonymMatch };
  }

  function topResultScoreGap(ranked) {
    const top = ranked[0];
    if (!top || top.combined <= 0) return 0;
    const runnerUp = ranked[1];
    if (!runnerUp) return 1;
    return Math.max(0, Math.min(1, (top.combined - runnerUp.combined) / top.combined));
  }

  function computeRetrievalConfidence(query, ranked) {
    if (!ranked || !ranked.length) return { label: 'Low', score: 0 };

    const top = ranked[0];
    const { titleMatched, exactTitleMatch, synonymMatch } = topResultTitleSignals(query, top);
    const gap = topResultScoreGap(ranked);

    let score = 0;
    if (exactTitleMatch) score += 4;
    else if (titleMatched) score += 3;
    else if (synonymMatch) score += 2;

    if (top.bm25 > 0) score += 1;
    if (top.bm25 >= 5) score += 1;
    if (top.cosine >= 0.15) score += 1;
    if (top.cosine >= 0.3) score += 1;

    if (gap >= 0.5) score += 2;
    else if (gap >= 0.2) score += 1;

    let label;
    if (score >= 6) label = 'High';
    else if (score >= 3) label = 'Medium';
    else label = 'Low';

    return {
      label,
      score,
      titleMatched,
      exactTitleMatch,
      synonymMatch,
      bm25: top.bm25,
      cosine: top.cosine,
      scoreGap: gap,
    };
  }

  const SEARCH_TESTS = [
    { query: 'movie title', expectedSection: 'Title Name Validation' },
    { query: 'spoken language', expectedSection: 'Original Language' },
    { query: 'poster', expectedSection: 'Artwork' },
  ];

  function resolveTopSection(query) {
    const ranked = titleFirstRetrieval(query);
    if (!ranked.length) return null;
    return ranked[0].chunk.sectionHeading.replace(/^[\d.]+\s*/, '').trim();
  }

  function runSearchTest(test) {
    const retrieved = resolveTopSection(test.query);
    return { ...test, retrieved, pass: retrieved === test.expectedSection };
  }

  function runSearchTests(tests) {
    const cases = tests || SEARCH_TESTS;
    const results = cases.map(runSearchTest);
    const divider = '-'.repeat(50);

    console.log(divider);
    console.log('Search Test Results');
    results.forEach((r) => {
      console.log('');
      console.log(r.pass ? 'PASS' : 'FAIL');
      console.log('Query:');
      console.log(`  ${r.query}`);
      console.log('Expected:');
      console.log(`  ${r.expectedSection}`);
      console.log('Retrieved:');
      console.log(`  ${r.retrieved === null ? '(no result)' : r.retrieved}`);
      console.log('');
      console.log(divider);
    });

    const total = results.length;
    const passed = results.filter((r) => r.pass).length;
    const failed = total - passed;
    const successRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';

    console.log('Summary');
    console.log('');
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${successRate}%`);
    console.log(divider);

    return results;
  }

  function runSearchTestsIfEnabled() {
    if (!DEBUG_SEARCH_TESTS) return;
    runSearchTests(SEARCH_TESTS);
  }

  function buildQueryUnderstanding(query) {
    const originalQuery = query || '';
    const normalizedQuery = normalizeQueryForTitleSearch(originalQuery);

    const keywords = Array.from(new Set(tokenize(normalizedQuery)));

    const expandedTerms = expandQueryTokens(keywords).filter((t) => !keywords.includes(t));
    const aliases = expandQueryWithTitleSynonyms(keywords).filter((t) => !keywords.includes(t));

    return { originalQuery, normalizedQuery, keywords, expandedTerms, aliases };
  }

  const FIELD_TIER_HEADING = 0.17;
  const FIELD_TIER_SUBHEADING = 0.25;
  const FIELD_TIER_KEYWORD = 0.34;
  const FIELD_TIER_ALIAS = 0.67;

  const FIELD_BOOST_TITLE = 3;
  const FIELD_BOOST_HEADING = 2.6;
  const FIELD_BOOST_SUBHEADING = 2.3;
  const FIELD_BOOST_KEYWORD = 2;
  const FIELD_BOOST_ALIAS = 1;

  function isKeywordFieldMatch(chunk, queryTokens) {
    if (!queryTokens.length || !chunk.keywords || !chunk.keywords.length) return false;
    const keywordTokens = new Set(chunk.keywords.flatMap((k) => tokenize(k)));
    return queryTokens.every((t) => keywordTokens.has(t));
  }

  function isAliasFieldMatch(chunk, queryTokens) {
    if (!queryTokens.length || !chunk.aliases || !chunk.aliases.length) return false;
    const aliasTokens = new Set(chunk.aliases.flatMap((a) => tokenize(a)));
    return queryTokens.every((t) => aliasTokens.has(t));
  }

  function isFieldTextMatch(text, queryTokens) {
    if (!queryTokens.length || !text) return false;
    const textTokens = stemTokens(tokenize(text));
    if (textTokens.length < 2) return false;
    return textTokens.every((t) => queryTokens.includes(t));
  }

  function findFieldMatchedSectionIds(itemType, queryTokens) {
    if (!queryTokens.length) return [];
    const items = getComprehensiveIndex().byType.get(itemType) || [];
    const ids = new Set();
    items.forEach((item) => {
      if (isFieldTextMatch(item.text, queryTokens)) ids.add(item.sectionId);
    });
    return [...ids];
  }

  function findHeadingMatchedSectionIds(queryTokens) {
    return findFieldMatchedSectionIds(INDEX_ITEM_TYPES.HEADING, queryTokens);
  }

  function findSubheadingMatchedSectionIds(queryTokens) {
    return findFieldMatchedSectionIds(INDEX_ITEM_TYPES.SUBHEADING, queryTokens);
  }

  const NEGATIVE_KEYWORD_PENALTY = 20;

  function isNegativeKeywordMatch(section, queryTokens) {
    if (!queryTokens.length || !section || !section.negativeKeywords || !section.negativeKeywords.length) {
      return false;
    }
    return section.negativeKeywords.some((neg) => {
      const negTokens = tokenize(neg);
      return negTokens.length > 0 && negTokens.every((t) => queryTokens.includes(t));
    });
  }

  function classifyTier(chunk, query, queryTokens) {
    const lowerContent = chunk.content.toLowerCase();
    const lowerQuery = query.trim().toLowerCase();
    if (lowerQuery && lowerContent.includes(lowerQuery)) return 1;

    const exactHits = queryTokens.filter((t) => countWordMatches(lowerContent, t) > 0);
    if (queryTokens.length > 0 && exactHits.length === queryTokens.length) return 2;
    if (exactHits.length >= 2) return 3;
    if (exactHits.length >= 1) return 4;

    const words = lowerContent.split(/[^a-z0-9]+/).filter(Boolean);
    if (queryTokens.some((t) => words.some((w) => isFuzzyHit(w, t)))) return 4;

    return 5;
  }

  function logSearch(query, ranked) {
    const rows = ranked.map((r) => ({
      query,
      chunkId: r.chunk.id,
      searchType: r.searchType,
      tier: r.tier,
      score: Number(r.combined.toFixed(3)),
      sopName: r.chunk.sopName,
      sectionHeading: r.chunk.sectionHeading,
      page: r.chunk.page,
    }));
    if (typeof console.table === 'function') console.table(rows);
    else console.log('[SOP search]', rows);
  }

  function hybridSearch(query) {
    const idx = getChunkIndex();

    const originalQueryTokens = tokenize(query);

    const keywordQueryTokens = tokenize(normalizeQueryForTitleSearch(query));

    const headingSectionIds = new Set(findHeadingMatchedSectionIds(keywordQueryTokens));
    const subheadingSectionIds = new Set(findSubheadingMatchedSectionIds(keywordQueryTokens));

    const queryTokens = expandQueryTokens(originalQueryTokens);
    if (!queryTokens.length) return [];

    const stemmedQueryTokens = stemTokens(queryTokens);

    const scored = idx.chunks.map((chunk, i) => ({
      chunk,
      bm25: bm25ScoreForChunk(stemmedQueryTokens, idx, i),
      cosine: cosineScoreForChunk(stemmedQueryTokens, idx, i),
      keywordFieldMatch: isKeywordFieldMatch(chunk, keywordQueryTokens),
    }));

    const byId = new Map();
    scored.filter((r) => r.bm25 > 0).forEach((r) => {
      byId.set(r.chunk.id, { ...r, foundBy: new Set(['keyword']) });
    });
    scored.filter((r) => r.cosine > 0.05).forEach((r) => {
      if (byId.has(r.chunk.id)) byId.get(r.chunk.id).foundBy.add('semantic');
      else byId.set(r.chunk.id, { ...r, foundBy: new Set(['semantic']) });
    });

    scored.filter((r) => r.keywordFieldMatch).forEach((r) => {
      if (byId.has(r.chunk.id)) byId.get(r.chunk.id).foundBy.add('keyword-field');
      else byId.set(r.chunk.id, { ...r, foundBy: new Set(['keyword-field']) });
    });

    scored.filter((r) => headingSectionIds.has(r.chunk.page)).forEach((r) => {
      if (byId.has(r.chunk.id)) byId.get(r.chunk.id).foundBy.add('heading');
      else byId.set(r.chunk.id, { ...r, foundBy: new Set(['heading']) });
    });
    scored.filter((r) => subheadingSectionIds.has(r.chunk.page)).forEach((r) => {
      if (byId.has(r.chunk.id)) byId.get(r.chunk.id).foundBy.add('subheading');
      else byId.set(r.chunk.id, { ...r, foundBy: new Set(['subheading']) });
    });

    const ranked = [...byId.values()]
      .map((r) => {

        const titleMatch = isTitleMatch(r.chunk.sectionHeading, originalQueryTokens);

        const headingMatch = !titleMatch && headingSectionIds.has(r.chunk.page);
        const subheadingMatch = !titleMatch && !headingMatch && subheadingSectionIds.has(r.chunk.page);
        const keywordMatch = !titleMatch && !headingMatch && !subheadingMatch && r.keywordFieldMatch;
        const aliasMatch = !titleMatch && !headingMatch && !subheadingMatch && !keywordMatch
          && isAliasFieldMatch(r.chunk, originalQueryTokens);
        const tier = titleMatch
          ? 0
          : headingMatch
            ? FIELD_TIER_HEADING
            : subheadingMatch
              ? FIELD_TIER_SUBHEADING
              : keywordMatch
                ? FIELD_TIER_KEYWORD
                : aliasMatch
                  ? FIELD_TIER_ALIAS
                  : classifyTier(r.chunk, query, queryTokens);
        const titleExtraWords = titleMatch ? titleExtraWordCount(r.chunk.sectionHeading, originalQueryTokens) : 0;
        const searchType = r.foundBy.size > 1 ? 'hybrid' : [...r.foundBy][0];
        const fieldBoost = titleMatch
          ? FIELD_BOOST_TITLE
          : headingMatch
            ? FIELD_BOOST_HEADING
            : subheadingMatch
              ? FIELD_BOOST_SUBHEADING
              : keywordMatch
                ? FIELD_BOOST_KEYWORD
                : aliasMatch
                  ? FIELD_BOOST_ALIAS
                  : 0;

        const section = titleMatch ? null : getSopById().get(r.chunk.page);
        const negativeMatch = !titleMatch && isNegativeKeywordMatch(section, keywordQueryTokens);
        const negativePenalty = negativeMatch ? NEGATIVE_KEYWORD_PENALTY : 0;

        const combined = Math.max(0, r.bm25 + r.cosine * 2 + fieldBoost - negativePenalty);
        return { ...r, tier, titleExtraWords, searchType, combined };
      })

      .filter((r) => r.tier < 5 || r.cosine > 0.12)
      .sort((a, b) => (a.tier - b.tier) || (a.titleExtraWords - b.titleExtraWords) || (b.combined - a.combined));

    if (DEBUG_SEARCH) logSearch(query, ranked);

    if (DEBUG_SEARCH) {
      lastSearchDebug = {
        query,
        normalizedQuery: query.trim().toLowerCase(),
        totalChunksExamined: idx.chunks.length,
        chunksScored: byId.size,
        candidates: ranked.map((r) => ({
          chunkId: r.chunk.id,
          sectionTitle: r.chunk.sectionHeading,
          bm25: r.bm25,
          cosine: r.cosine,
          combined: r.combined,
          tier: r.tier,
          titleMatch: r.tier === 0,
          exactPhrase: r.tier === 1,
          keywordOverlap: r.foundBy.has('keyword'),
          semantic: r.foundBy.has('semantic'),
        })),
      };
    }

    return ranked;
  }

  function searchSOP(query) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];

    const results = SOP.map((section) => {
      const title = plainTitle(section);
      const titleTokens = tokenize(section.title);
      const keywordText = section.keywords.join(' ').toLowerCase();
      const bodyText = section.body.toLowerCase();
      let score = 0;
      let covered = 0;

      tokens.forEach((tok) => {
        let hit = false;

        if (titleTokens.includes(tok)) { score += 10; hit = true; }
        else {
          const strength = wordMatchStrength(title, tok);
          if (strength === 2) { score += 7; hit = true; }
          else if (strength === 1) { score += 4; hit = true; }
        }

        const kwStrength = wordMatchStrength(keywordText, tok);
        if (kwStrength === 2) { score += 5; hit = true; }
        else if (kwStrength === 1) { score += 3; hit = true; }

        const bodyHits = countWordMatches(bodyText, tok);
        if (bodyHits > 0) { score += Math.min(bodyHits, 3); hit = true; }

        if (hit) covered += 1;
      });

      if (tokens.every((t) => countWordMatches(title, t) > 0)) score += 6;

      return { section, score, coverage: covered / tokens.length };
    })
      .filter((r) => r.coverage > 0)
      .sort((a, b) => (b.coverage - a.coverage) || (b.score - a.score));

    return results;
  }

  let SUGGEST_INDEX = null;
  function getSuggestIndex() {
    if (SUGGEST_INDEX) return SUGGEST_INDEX;
    SUGGEST_INDEX = SOP.map((section) => ({
      phrase: plainTitle(section).replace(/\b\w/g, (c) => c.toUpperCase()),
      section,
      heading: null,
    }));
    return SUGGEST_INDEX;
  }

  function scoreSuggestCandidate(candidate, rawQuery, tokens) {
    const phraseLower = candidate.phrase.toLowerCase();
    const phraseWords = phraseLower.split(/[^a-z0-9]+/).filter(Boolean);

    if (phraseLower.startsWith(rawQuery)) return 4000;

    if (phraseWords.some((w) => w.startsWith(rawQuery)) || phraseLower.includes(rawQuery)) {
      return 3000;
    }

    const aliases = TITLE_SYNONYMS[candidate.phrase];
    if (aliases && aliases.some((alias) => {
      const aliasLower = alias.toLowerCase();
      return aliasLower.startsWith(rawQuery) || aliasLower.split(/\s+/).some((w) => w.startsWith(rawQuery));
    })) {
      return 2000;
    }

    const kwText = candidate.section.keywords.join(' ').toLowerCase();
    if (tokens.length && tokens.every((tok) => wordMatchStrength(kwText, tok) > 0)) {
      return 1000;
    }

    return 0;
  }

  function suggestPhrases(query) {
    const rawQuery = query.trim().toLowerCase();
    if (!rawQuery) return [];
    const tokens = rawQuery.split(/\s+/).filter(Boolean);

    return getSuggestIndex()
      .map((candidate) => ({ candidate, score: scoreSuggestCandidate(candidate, rawQuery, tokens) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => (b.score - a.score) || a.candidate.phrase.localeCompare(b.candidate.phrase))
      .slice(0, 8)
      .map(({ candidate }) => candidate);
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function scrollRowToTop(row) {
    messages.scrollTop = Math.max(0, row.offsetTop - 8);
  }

  function scrollFollow(el) {
    const containerRect = messages.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (elRect.bottom > containerRect.bottom) {
      messages.scrollTop += elRect.bottom - containerRect.bottom + 6;
    }
  }

  function scrollElementToTop(el) {
    const containerRect = messages.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    messages.scrollTop += (elRect.top - containerRect.top) - 8;
  }

  function typeInto(el, text) {
    return new Promise((resolve) => {
      if (!text) { resolve(); return; }
      const CHARS_PER_TICK = 3;
      const TICK_MS = 10;
      let i = 0;
      (function tick() {
        i = Math.min(text.length, i + CHARS_PER_TICK);
        el.textContent = text.slice(0, i);
        scrollFollow(el);
        if (i < text.length) setTimeout(tick, TICK_MS);
        else resolve();
      })();
    });
  }

  function addMessage(text, who  ) {
    const row = document.createElement('div');
    row.className = `ea-row ea-${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'ea-bubble';
    row.appendChild(bubble);
    messages.appendChild(row);

    if (who === 'bot') {
      scrollRowToTop(row);
      return typeInto(bubble, text).then(() => row);
    }
    bubble.textContent = text;
    scrollToBottom();
    return row;
  }

  async function loadSopData() {
    console.log('[SOP Assistant] Loading embedded SOP data…');

    SOP = EMBEDDED_SOP;
    console.log(`[SOP Assistant] Loaded ${SOP.length} SOP section(s)`);

    console.log('[SOP Assistant] Building search index…');
    resetSearchIndexes();
    getChunkIndex();
    getSuggestIndex();

    getComprehensiveIndex();
    console.log('[SOP Assistant] Search index built —', getComprehensiveIndex().N, 'searchable elements indexed');
    console.log('[SOP Assistant] SOP initialization complete —', SOP.length, 'sections ready');
  }

  function classifyEvidenceListLine(line) {
    if (EXCEPTION_LINE_RE.test(line)) return 'exceptions';
    if (NOTE_LINE_RE.test(line)) return 'notes';
    return 'rules';
  }

  function buildStructuredEvidenceContext(rows) {
    if (!rows.length) return '';
    const primaryPage = rows[0].chunk.page;
    const primaryHeading = rows[0].chunk.sectionHeading;

    const primaryTopic = [];
    const rules = [];
    const exceptions = [];
    const tables = [];
    const cti = [];
    const notes = [];
    const related = [];

    rows.forEach((r) => {
      if (r.chunk.page !== primaryPage) {
        related.push(`[Related — ${r.chunk.sectionHeading}]\n${r.chunk.content}`);
        return;
      }
      parseBlocks(r.chunk.content).forEach((block) => {
        if (block.type === 'table') { tables.push(block.lines.join('\n')); return; }
        if (block.type === 'cti') { cti.push(block.lines.join('\n')); return; }
        if (block.type === 'heading') { primaryTopic.push(`## ${block.lines[0].replace(/^##\s*/, '')}`); return; }
        if (block.type === 'image') return;
        if (block.type === 'list') {
          block.lines.forEach((line) => {
            const bucket = classifyEvidenceListLine(line);
            if (bucket === 'exceptions') exceptions.push(line);
            else if (bucket === 'notes') notes.push(line);
            else rules.push(line);
          });
          return;
        }
        primaryTopic.push(block.lines.join('\n'));
      });
    });

    const sections = [];
    const addSection = (label, lines) => {
      if (lines.length) sections.push(`=== ${label} ===\n${lines.join('\n')}`);
    };

    addSection(`Primary Topic: ${primaryHeading}`, primaryTopic);
    addSection('Supporting Rules', rules);
    addSection('Exceptions', exceptions);
    addSection('Tables', tables);
    addSection('CTI', cti);
    addSection('Notes', notes);
    addSection('Related References', related);

    return sections.join('\n\n');
  }

  async function summarizeLocally(query, ranked) {
    if (!ranked.length) return null;
    const queryTokens = new Set(stemTokens(expandQueryTokens(tokenize(query))));
    const primaryPage = ranked[0].chunk.page;
    const KEY_RE = /\b(sla|sev\d|ticket|fail|pass|must|required|missing|minimum|critical|major|minor)\b/i;
    const RULE_RE = /^(-\s+|\d+[.)]\s+)?(notes?|exceptions?|example)\b|\b(if|only|never|do not)\b/i;
    const seen = new Set();
    const paragraphs = [];
    const keyInformation = [];
    const importantRules = [];
    const push = (arr, line) => {
      const text = line.replace(/^(-\s+|\d+[.)]\s+|step\s*\d+\s*:\s*)/i, '').trim();
      if (!text || seen.has(text) || arr.length >= 6) return;
      seen.add(text);
      arr.push(text);
    };

    ranked.forEach((r) => {
      if (r.chunk.page !== primaryPage) return;
      parseBlocks(r.chunk.content).forEach((block) => {
        if (['heading', 'table', 'image', 'cti'].includes(block.type)) return;
        block.lines.forEach((line) => {
          if (RULE_RE.test(line)) push(importantRules, line);
          else if (block.type === 'list' || KEY_RE.test(line)) push(keyInformation, line);
          else paragraphs.push(line);
        });
      });
    });

    const scored = paragraphs.map((p, i) => ({
      p, i, score: stemTokens(tokenize(p)).filter((t) => queryTokens.has(t)).length,
    }));
    const picked = scored
      .slice()
      .sort((a, b) => b.score - a.score || a.i - b.i)
      .slice(0, 2)
      .sort((a, b) => a.i - b.i)
      .map((x) => x.p);
    const summary = (picked.length ? picked : keyInformation.slice(0, 2)).join(' ');

    return { summary, keyInformation, importantRules };
  }

  const EVIDENCE_RELATED_TIER_SLACK = 1;
  const EVIDENCE_RELATED_SCORE_RATIO = 0.6;

  function computeCoverageScore(query, evidenceRows) {
    const queryKeywords = buildQueryUnderstanding(query).keywords;
    if (!queryKeywords.length || !evidenceRows.length) return 0;
    const haystack = evidenceRows.map((r) => r.chunk.content.toLowerCase()).join(' ');
    const covered = queryKeywords.filter((t) => countWordMatches(haystack, t) > 0).length;
    return covered / queryKeywords.length;
  }

  function computeEvidenceQuality(confidence, coverageScore) {
    const score = (Math.min(confidence.score, 10) / 10 + coverageScore) / 2;
    let label;
    if (score >= 0.66) label = 'High';
    else if (score >= 0.33) label = 'Medium';
    else label = 'Low';
    return { score, label };
  }

  function validateEvidence(query, rows) {
    if (!rows.length) {
      return { evidence: [], confidence: computeRetrievalConfidence(query, rows), coverageScore: 0, quality: { score: 0, label: 'Low' } };
    }

    const seenIds = new Set();
    const deduped = rows.filter((r) => {
      if (seenIds.has(r.chunk.id)) return false;
      seenIds.add(r.chunk.id);
      return true;
    });

    const primary = deduped[0];
    const primaryTier = primary.tier ?? 0;
    const primaryCombined = primary.combined ?? 0;

    const bySection = new Map();
    deduped.forEach((r) => {
      if (!bySection.has(r.chunk.page)) bySection.set(r.chunk.page, []);
      bySection.get(r.chunk.page).push(r);
    });

    const queryTokens = tokenize(normalizeQueryForTitleSearch(query));
    const evidence = [];
    bySection.forEach((group, sectionId) => {

      if (sectionId === primary.chunk.page) {
        evidence.push(...group);
        return;
      }

      const best = group[0];
      const closeTier = (best.tier ?? 0) <= primaryTier + EVIDENCE_RELATED_TIER_SLACK;
      const closeScore = (best.combined ?? 0) >= primaryCombined * EVIDENCE_RELATED_SCORE_RATIO;

      const section = getSopById().get(sectionId);
      const conflicting = isNegativeKeywordMatch(section, queryTokens);

      if (closeTier && closeScore && !conflicting) evidence.push(...group);
    });

    const confidence = computeRetrievalConfidence(query, deduped);
    const coverageScore = computeCoverageScore(query, evidence);
    const quality = computeEvidenceQuality(confidence, coverageScore);

    return { evidence, confidence, coverageScore, quality };
  }

  const NO_CTI_SECTION_IDS = new Set(["2.2","2.2.3","2.2.7","2.5","2.7","2.2.3"]);
  const CANONICAL_CTI = { c: 'Streaming Catalog', t: 'Partner', i: 'Redelivery Request' };

  const CTI_OVERRIDES = {
    "offers-overview": {
      "c": "Streaming Catalog",
      "t": "Content Issue",
      "i": "Offer Withdrawn"
    },
    "2.1.1": {
      "c": "Streaming Catalog",
      "t": "Offers",
      "i": "General",
      "group": "Catalog Offers"
    },
    "2.1.2": {
      "c": "Streaming Catalog",
      "t": "Rights",
      "i": "Window Missing"
    },
    "2.1.3": {
      "c": "Streaming Catalog",
      "t": "Live",
      "i": "Offer Missing"
    },
    "2.1.4": {
      "c": "Streaming Catalog",
      "t": "Offers",
      "i": "Season Pass"
    },
    "2.2.1": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Partner Redelivery"
    },
    "2.2.2": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Synopsis"
    },
    "2.2.4": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Episode Sequence"
    },
    "duplicate-title": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Title Merge"
    },
    "2.2.5": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Cast"
    },
    "2.2.6": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Release Date"
    },
    "2.2.8": {
      "c": "Streaming Catalog",
      "t": "Metadata",
      "i": "Genre"
    },
    "2.3": {
      "c": "Streaming Catalog",
      "t": "Artwork",
      "i": "Quality"
    },
    "2.3.1": {
      "c": "Streaming Catalog",
      "t": "Artwork",
      "i": "Episode Thumbnail"
    },
    "2.3.2": {
      "c": "Streaming Catalog",
      "t": "Artwork",
      "i": "Season Poster"
    },
    "2.3.3": {
      "c": "Streaming Catalog",
      "t": "Artwork",
      "i": "Hero Banner"
    },
    "2.4.1": {
      "c": "Streaming Catalog",
      "t": "Playback",
      "i": "Source Missing"
    },
    "2.4.2": {
      "c": "Streaming Catalog",
      "t": "Playback",
      "i": "Video Quality"
    },
    "2.4.3": {
      "c": "Streaming Catalog",
      "t": "Playback",
      "i": "Audio Quality"
    },
    "2.4.4": {
      "c": "Streaming Catalog",
      "t": "Playback",
      "i": "AV Sync"
    },
    "2.4.5": {
      "c": "Streaming Catalog",
      "t": "Subtitles",
      "i": "Timing"
    },
    "2.4.6": {
      "c": "Streaming Catalog",
      "t": "Subtitles",
      "i": "Quality"
    },
    "2.4.7": {
      "c": "Streaming Catalog",
      "t": "Subtitles",
      "i": "Forced Narrative"
    },
    "2.4.8": {
      "c": "Streaming Catalog",
      "t": "Playback",
      "i": "Trailer"
    },
    "2.6": {
      "c": "Streaming Catalog",
      "t": "Partner",
      "i": "Redelivery Request"
    }
  };

  const CTI_HEADING_OVERRIDES = {
    'offers-overview': {
      'Offer withdrawn': { c: 'Streaming Catalog', t: 'Content Issue', i: 'Offer Withdrawn' },
    },
  };

  function resolveCti(query, ranked) {
    const top = ranked[0];
    const primaryPage = top && top.chunk.page;
    if (NO_CTI_SECTION_IDS.has(primaryPage)) return { c: '', t: '', i: '' };

    const headingOverrides = CTI_HEADING_OVERRIDES[primaryPage];
    if (headingOverrides && query) {
      const queryTokens = tokenize(normalizeQueryForTitleSearch(query));
      const matchedHeading = (getComprehensiveIndex().bySection.get(primaryPage) || [])
        .find((item) => (item.type === 'heading' || item.type === 'subheading')
          && headingOverrides[item.text]
          && isFieldTextMatch(item.text, queryTokens));
      if (matchedHeading) return headingOverrides[matchedHeading.text];
    }

    if (CTI_OVERRIDES[primaryPage]) return CTI_OVERRIDES[primaryPage];
    return CANONICAL_CTI;
  }

  const MRCD_LINK_SECTION_ID = '2.2.3';
  const MRCD_TICKET_URL = 'https://example.com/ratings-desk-request';
  const MRCD_STATEMENT_TEXT = 'Raise a request to the Ratings Desk and mark “Failed” in QC Tracker with comments.';

  function isRatingMissingTopic(ranked) {
    return (ranked[0] && ranked[0].chunk.page) === MRCD_LINK_SECTION_ID;
  }

  function buildCtiBlock(cti) {
    const parts = [
      ['C', cti.c],
      ['T', cti.t],
      ['I', cti.i],
      ['Group', cti.group],
    ].filter(([, value]) => value);
    if (!parts.length) return null;

    const block = document.createElement('div');
    block.className = 'ea-cti-block';
    const label = document.createElement('div');
    label.className = 'ea-cti-label';
    label.textContent = 'CTI';
    block.appendChild(label);
    parts.forEach(([letter, value]) => {
      const line = document.createElement('div');
      line.className = 'ea-cti-line';
      const tag = document.createElement('span');
      tag.className = 'ea-cti-letter';
      tag.textContent = letter;
      const val = document.createElement('span');
      val.className = 'ea-cti-value';
      val.textContent = value;
      line.appendChild(tag);
      line.appendChild(document.createTextNode(' - '));
      line.appendChild(val);
      block.appendChild(line);
    });
    return block;
  }

  function buildMrcdLinkSection() {
    const block = document.createElement('div');
    block.className = 'ea-mrcd-block';
    const label = document.createElement('div');
    label.className = 'ea-mrcd-label';
    label.textContent = 'Ratings Desk request';
    block.appendChild(label);
    const a = document.createElement('a');
    a.href = MRCD_TICKET_URL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'ea-inline-link';
    a.textContent = MRCD_STATEMENT_TEXT;
    block.appendChild(a);
    return block;
  }

  const SUMMARY_CACHE = new Map();

  async function getAnswerSummary(query, ranked) {
    const key = query.trim().toLowerCase();
    if (SUMMARY_CACHE.has(key)) return SUMMARY_CACHE.get(key);
    const result = await summarizeLocally(query, ranked);
    if (result) SUMMARY_CACHE.set(key, result);
    return result;
  }

  function addCollapsibleSection(container, label, renderFn, group) {
    const toggle = document.createElement('button');
    toggle.className = 'ea-toggle';
    toggle.type = 'button';
    toggle.innerHTML = `<span class="ea-toggle-label">${label}</span><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`;
    const panel = document.createElement('div');
    panel.className = 'ea-toggle-panel';
    panel.style.display = 'none';
    let expanded = false;
    let rendered = false;

    function collapse() {
      if (!expanded) return;
      expanded = false;
      toggle.classList.remove('ea-expanded');
      panel.style.display = 'none';
    }

    const handle = { collapse };
    if (group) group.push(handle);

    toggle.addEventListener('click', async () => {
      if (expanded) {
        collapse();
        return;
      }
      if (group) group.forEach((entry) => { if (entry !== handle) entry.collapse(); });
      expanded = true;
      toggle.classList.add('ea-expanded');
      panel.style.display = 'block';
      if (!rendered) {
        rendered = true;
        await renderFn(panel);
      }

      scrollElementToTop(toggle);
    });
    container.appendChild(toggle);
    container.appendChild(panel);
  }

  function addBulletListSection(container, label, items, accordionGroup) {
    if (!items.length) return;
    addCollapsibleSection(container, label, (el) => {
      const ul = document.createElement('ul');
      ul.className = 'ea-list';
      el.appendChild(ul);
      items.forEach((line) => {
        const li = document.createElement('li');
        li.textContent = line;
        ul.appendChild(li);
      });
    }, accordionGroup);
  }

  function addCaptionedItemsSection(container, label, items, buildItem, accordionGroup) {
    if (!items.length) return;
    addCollapsibleSection(container, label, (el) => {
      items.forEach((item, i) => {
        if (i > 0) {
          const spacer = document.createElement('div');
          spacer.style.marginTop = '14px';
          el.appendChild(spacer);
        }
        if (item.caption) {
          const caption = document.createElement('div');
          caption.className = 'ea-table-caption';
          caption.textContent = item.caption;
          el.appendChild(caption);
        }
        el.appendChild(buildItem(item));
      });
    }, accordionGroup);
  }

  function addSourcesBlock(container, ranked) {
    const sourceSeen = new Set();
    const sources = [];
    ranked.forEach((r) => {
      if (sourceSeen.has(r.chunk.page)) return;
      sourceSeen.add(r.chunk.page);
      sources.push(r.chunk);
    });
    if (!sources.length) return;
    const h = document.createElement('div');
    h.className = 'ea-sub';
    h.textContent = 'Sources';
    container.appendChild(h);
    const ul = document.createElement('ul');
    ul.className = 'ea-list';
    container.appendChild(ul);
    sources.forEach((chunk) => {
      const li = document.createElement('li');
      li.textContent = `${chunk.sopName} · ${chunk.sectionHeading} · Section ${chunk.page}`;
      ul.appendChild(li);
    });
  }

  function logRetrievalDebug(debugInfo) {
    const groupLabel = `[SOP Assistant] Retrieval Debug — "${debugInfo.query}"`;
    if (typeof console.groupCollapsed === 'function') console.groupCollapsed(groupLabel);
    else console.log(groupLabel);

    console.log('Query:', debugInfo.query);
    console.log('Normalized:', debugInfo.normalizedQuery);

    console.log('Evidence Summary:', {
      'Total chunks examined': debugInfo.totalChunksExamined,
      'Chunks scored': debugInfo.chunksScored,
      'Chunks selected': debugInfo.chunksSelected,
      'Chunks sent to AI': debugInfo.chunksSentToAI,
    });

    const rows = debugInfo.candidates.map((c) => {
      const isTop = c.chunkId === debugInfo.topChunkId;
      const isSent = debugInfo.shownChunkIds.has(c.chunkId);
      let status = 'Rejected';
      if (isTop) status = 'Top match';
      else if (isSent) status = 'Sent to AI';

      const reasons = [];
      if (c.titleMatch) reasons.push('Title match');
      if (c.exactPhrase) reasons.push('Exact phrase');
      if (c.keywordOverlap) reasons.push('Keyword overlap');
      if (c.semantic) reasons.push('Semantic similarity');

      return {
        Section: c.sectionTitle,
        Chunk: c.chunkId,
        BM25: Number(c.bm25.toFixed(3)),
        Cosine: Number(c.cosine.toFixed(3)),
        Final: Number(c.combined.toFixed(3)),
        Tier: c.tier,
        'Why it matched': reasons.join(', ') || '—',
        Status: status,
      };
    });
    if (typeof console.table === 'function') console.table(rows);
    else console.log('Candidates:', rows);

    if (typeof console.groupEnd === 'function') console.groupEnd();
  }

  function splitTableRow(line) {
    let inner = line.trim();
    if (inner.startsWith('|')) inner = inner.slice(1);
    if (inner.endsWith('|')) inner = inner.slice(0, -1);
    return inner.split('|').map((c) => c.trim());
  }

  function isTableSeparatorRow(line) {
    return /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(line.trim());
  }

  function buildHeaderRows(headerCells) {
    const frag = document.createDocumentFragment();
    const split = headerCells.map((cell) => {
      const idx = cell.indexOf(' - ');
      return idx === -1 ? null : [cell.slice(0, idx), cell.slice(idx + 3)];
    });
    const isGrouped = split.some((s) => s !== null);

    if (!isGrouped) {
      const headRow = document.createElement('tr');
      headerCells.forEach((cell) => {
        const th = document.createElement('th');
        th.textContent = cell;
        headRow.appendChild(th);
      });
      frag.appendChild(headRow);
      return frag;
    }

    const groupRow = document.createElement('tr');
    const subRow = document.createElement('tr');
    let i = 0;
    while (i < headerCells.length) {
      if (split[i] === null) {
        const th = document.createElement('th');
        th.textContent = headerCells[i];
        th.rowSpan = 2;
        groupRow.appendChild(th);
        i += 1;
        continue;
      }
      const groupLabel = split[i][0];
      let span = 0;
      while (i + span < headerCells.length && split[i + span] && split[i + span][0] === groupLabel) span += 1;
      const th = document.createElement('th');
      th.textContent = groupLabel;
      th.colSpan = span;
      th.className = 'ea-table-group-th';
      groupRow.appendChild(th);
      for (let j = 0; j < span; j += 1) {
        const sub = document.createElement('th');
        sub.textContent = split[i + j][1];
        sub.className = 'ea-table-sub-th';
        subRow.appendChild(sub);
      }
      i += span;
    }
    frag.appendChild(groupRow);
    frag.appendChild(subRow);
    return frag;
  }

  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxScale = 1;
  let lightboxPanX = 0;
  let lightboxPanY = 0;
  const LIGHTBOX_MIN_SCALE = 1;
  const LIGHTBOX_MAX_SCALE = 4;

  function applyLightboxTransform() {
    lightboxImg.style.transform = `translate(${lightboxPanX}px, ${lightboxPanY}px) scale(${lightboxScale})`;
    lightboxStage.style.cursor = lightboxScale > 1 ? 'grab' : 'zoom-in';
  }

  function resetLightboxZoom() {
    lightboxScale = 1;
    lightboxPanX = 0;
    lightboxPanY = 0;
    applyLightboxTransform();
  }

  function showLightboxIndex(i) {
    lightboxIndex = i;
    const item = lightboxItems[i];
    resetLightboxZoom();
    lightboxImg.src = item.dataUri;
    lightboxImg.alt = item.alt || 'Example';
    lightboxCaption.textContent = item.caption || item.alt || '';
    lightboxCaption.style.display = lightboxCaption.textContent ? '' : 'none';
    const multi = lightboxItems.length > 1;
    lightboxPrevBtn.hidden = !multi;
    lightboxNextBtn.hidden = !multi;
  }

  function openLightbox(items, index) {
    lightboxItems = items;
    showLightboxIndex(index);
    lightbox.classList.add('ea-open');
    lightbox.setAttribute('aria-hidden', 'false');

    launcher.style.visibility = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('ea-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxItems = [];
    launcher.style.visibility = '';
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxPrevBtn.addEventListener('click', () => {
    if (lightboxItems.length < 2) return;
    showLightboxIndex((lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length);
  });
  lightboxNextBtn.addEventListener('click', () => {
    if (lightboxItems.length < 2) return;
    showLightboxIndex((lightboxIndex + 1) % lightboxItems.length);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxStage) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('ea-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft' && lightboxItems.length > 1) showLightboxIndex((lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length);
    else if (e.key === 'ArrowRight' && lightboxItems.length > 1) showLightboxIndex((lightboxIndex + 1) % lightboxItems.length);
  });

  lightboxStage.addEventListener('wheel', (e) => {
    if (!lightbox.classList.contains('ea-open')) return;
    e.preventDefault();
    const next = lightboxScale - e.deltaY * 0.0015 * lightboxScale;
    lightboxScale = Math.min(LIGHTBOX_MAX_SCALE, Math.max(LIGHTBOX_MIN_SCALE, next));
    if (lightboxScale === LIGHTBOX_MIN_SCALE) { lightboxPanX = 0; lightboxPanY = 0; }
    applyLightboxTransform();
  }, { passive: false });

  lightboxImg.addEventListener('dblclick', resetLightboxZoom);

  let lightboxDragPointerId = null;
  let lightboxDragStartX = 0;
  let lightboxDragStartY = 0;
  let lightboxPanOriginX = 0;
  let lightboxPanOriginY = 0;

  lightboxStage.addEventListener('pointerdown', (e) => {
    if (lightboxScale <= 1) return;
    lightboxDragPointerId = e.pointerId;
    lightboxDragStartX = e.clientX;
    lightboxDragStartY = e.clientY;
    lightboxPanOriginX = lightboxPanX;
    lightboxPanOriginY = lightboxPanY;
    lightboxStage.classList.add('ea-dragging');
    lightboxStage.setPointerCapture(e.pointerId);
  });
  lightboxStage.addEventListener('pointermove', (e) => {
    if (lightboxDragPointerId !== e.pointerId) return;
    lightboxPanX = lightboxPanOriginX + (e.clientX - lightboxDragStartX);
    lightboxPanY = lightboxPanOriginY + (e.clientY - lightboxDragStartY);
    applyLightboxTransform();
  });
  const endLightboxDrag = (e) => {
    if (lightboxDragPointerId !== e.pointerId) return;
    lightboxDragPointerId = null;
    lightboxStage.classList.remove('ea-dragging');
  };
  lightboxStage.addEventListener('pointerup', endLightboxDrag);
  lightboxStage.addEventListener('pointercancel', endLightboxDrag);

  const imageDataUriCache = new Map();
  function loadImage(id) {
    if (!imageDataUriCache.has(id)) {
      const promise = Promise.resolve().then(() => {
        const data = EMBEDDED_IMAGES[id];
        if (!data || !data.dataBase64) throw new Error(`Unknown embedded image id "${id}"`);
        return `data:${data.contentType || 'image/png'};base64,${data.dataBase64}`;
      });
      imageDataUriCache.set(id, promise);
    }
    return imageDataUriCache.get(id);
  }

  function buildTableImageCell(alt, id) {
    const td = document.createElement('td');
    td.className = 'ea-table-img-cell';
    const placeholder = document.createElement('span');
    placeholder.className = 'ea-table-img-loading';
    placeholder.textContent = 'Loading image…';
    td.appendChild(placeholder);

    loadImage(id).then((dataUri) => {
      const img = document.createElement('img');
      img.className = 'ea-table-img';
      img.src = dataUri;
      img.alt = alt || 'Example';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox([{ dataUri, alt }], 0));
      td.replaceChildren(img);
    }).catch(() => {
      placeholder.textContent = 'Image unavailable';
      placeholder.classList.add('ea-table-img-error');
    });

    return td;
  }

  function buildStandaloneImageBlock(alt, id, siblings) {
    const wrap = document.createElement('div');
    wrap.className = 'ea-image-block';
    const placeholder = document.createElement('span');
    placeholder.className = 'ea-table-img-loading';
    placeholder.textContent = 'Loading image…';
    wrap.appendChild(placeholder);

    loadImage(id).then((dataUri) => {
      const img = document.createElement('img');
      img.className = 'ea-table-img';
      img.src = dataUri;
      img.alt = alt || 'Example';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', async () => {
        const resolved = await Promise.all(siblings.map(async (s) => {
          const uri = await loadImage(s.id).catch(() => null);
          return uri ? { id: s.id, dataUri: uri, alt: s.alt, caption: s.caption } : null;
        }));
        const items = resolved.filter(Boolean);
        const startIndex = items.findIndex((it) => it.id === id);
        openLightbox(items, startIndex === -1 ? 0 : startIndex);
      });
      wrap.replaceChildren(img);
    }).catch(() => {
      placeholder.textContent = 'Image unavailable';
      placeholder.classList.add('ea-table-img-error');
    });

    return wrap;
  }

  function buildTable(rows) {
    const wrap = document.createElement('div');
    wrap.className = 'ea-table-wrap';
    const table = document.createElement('table');
    table.className = 'ea-table';
    wrap.appendChild(table);

    const headerCells = splitTableRow(rows[0]);
    const bodyRows = rows.length > 1 && isTableSeparatorRow(rows[1]) ? rows.slice(2) : rows.slice(1);

    const thead = document.createElement('thead');
    thead.appendChild(buildHeaderRows(headerCells));
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    bodyRows.forEach((rowLine) => {
      if (isTableSeparatorRow(rowLine)) return;
      const tr = document.createElement('tr');
      splitTableRow(rowLine).forEach((cell) => {
        const imgMatch = cell.match(STANDALONE_IMAGE_LINE_RE);
        if (imgMatch) {
          tr.appendChild(buildTableImageCell(imgMatch[1], imgMatch[2]));
          return;
        }
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    wrap.tabIndex = 0;
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Scrollable table');
    wrap.addEventListener('wheel', (e) => {
      const canX = wrap.scrollWidth > wrap.clientWidth + 1;
      const canY = wrap.scrollHeight > wrap.clientHeight + 1;
      if (!canX && !canY) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (canX) e.stopPropagation();
        return;
      }
      if (e.shiftKey && canX && e.deltaY) {
        wrap.scrollLeft += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false });

    return wrap;
  }

  const GENERIC_TABLE_HEADING_RE = /^(ex(ample)?\s*\d*|note)$/i;

  function extractAllTables(ranked) {
    const tables = [];
    const seen = new Set();
    ranked.forEach((r) => {
      let lastHeading = null;
      parseBlocks(r.chunk.content).forEach((block) => {
        if (block.type === 'heading') {
          const text = block.lines[0].replace(/^##\s*/, '');
          if (!GENERIC_TABLE_HEADING_RE.test(text.trim())) lastHeading = text;
          return;
        }
        if (block.type !== 'table') return;
        const key = block.lines.join('\n');
        if (seen.has(key)) return;
        seen.add(key);
        tables.push({ lines: block.lines, caption: lastHeading || r.chunk.sectionHeading });

        lastHeading = null;
      });
    });
    return tables;
  }

  function tableRelevanceText(t) {
    const headerLine = t.lines.find((l) => !isTableSeparatorRow(l));
    const headerCells = headerLine ? splitTableRow(headerLine) : [];
    return [t.caption || '', ...headerCells].join(' ').toLowerCase();
  }

  function isTableRelevantToQuery(t, queryTokens) {
    const text = tableRelevanceText(t);
    return queryTokens.every((tok) => wordMatchStrength(text, tok) > 0);
  }

  function extractTables(ranked, query) {
    const tables = extractAllTables(ranked);
    const singleSection = ranked.length > 0 && ranked.every((r) => r.chunk.page === ranked[0].chunk.page);
    if (singleSection) return tables;
    const queryTokens = tokenize(query || '');
    if (!queryTokens.length) return tables;
    const relevant = tables.filter((t) => isTableRelevantToQuery(t, queryTokens));
    return relevant.length ? relevant : tables;
  }

  function extractImages(ranked) {
    const images = [];
    const seen = new Set();
    ranked.forEach((r) => {
      let lastLabel = null;
      parseBlocks(r.chunk.content).forEach((block) => {
        if (block.type === 'heading') {
          const text = block.lines[0].replace(/^##\s*/, '');
          if (!GENERIC_TABLE_HEADING_RE.test(text.trim())) lastLabel = text;
          return;
        }
        if (block.type === 'para') {
          lastLabel = block.lines[0];
          return;
        }
        if (block.type !== 'image') return;
        const match = block.lines[0].match(STANDALONE_IMAGE_LINE_RE);
        if (!match) return;
        const id = match[2];
        if (seen.has(id)) return;
        seen.add(id);
        images.push({ alt: match[1], id, caption: lastLabel || r.chunk.sectionHeading });
      });
    });
    return images;
  }

  async function addAnswerMessage(query, ranked, note) {
    const row = document.createElement('div');
    row.className = 'ea-row ea-bot';
    const bubble = document.createElement('div');
    bubble.className = 'ea-bubble ea-rich';
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollRowToTop(row);

    if (note) {
      const n = document.createElement('div');
      n.className = 'ea-note';
      n.textContent = note;
      bubble.appendChild(n);
    }

    const status = document.createElement('div');
    status.className = 'ea-note';
    bubble.appendChild(status);
    await typeInto(status, 'Summarizing…');

    const validation = validateEvidence(query, ranked);
    if (DEBUG_SEARCH) {
      console.log('[SOP Assistant] Evidence validation —', {
        query,
        inputChunks: ranked.length,
        validatedChunks: validation.evidence.length,
        confidence: validation.confidence.label,
        coverageScore: Number(validation.coverageScore.toFixed(2)),
        quality: validation.quality.label,
      });
    }

    let data = null;
    try {
      data = await getAnswerSummary(query, validation.evidence);
    } catch (err) {

      console.error('SOP Assistant: summary generation failed', err);
    }

    status.remove();

    if (!data) {

      const errNote = document.createElement('div');
      errNote.className = 'ea-note';
      bubble.appendChild(errNote);
      await typeInto(errNote, "Couldn't generate a summary right now. Please try again in a moment.");
      scrollRowToTop(row);
      return row;
    }

    if (data.summary) {
      const h = document.createElement('div');
      h.className = 'ea-sub';
      bubble.appendChild(h);
      await typeInto(h, 'Summary');
      const p = document.createElement('div');
      p.className = 'ea-tldr';
      bubble.appendChild(p);
      await typeInto(p, data.summary);
    }

    if (isRatingMissingTopic(ranked)) {
      bubble.appendChild(buildMrcdLinkSection());
    }

    const ctiBlock = buildCtiBlock(resolveCti(query, ranked));
    if (ctiBlock) bubble.appendChild(ctiBlock);

    const accordionGroup = [];

    addBulletListSection(bubble, 'Key Information', data.keyInformation, accordionGroup);
    addBulletListSection(bubble, 'Important Rules & Cases', data.importantRules, accordionGroup);

    const tables = extractTables(ranked, query);
    addCaptionedItemsSection(bubble, `Tables (${tables.length})`, tables, (t) => buildTable(t.lines), accordionGroup);

    const images = extractImages(ranked);
    addCaptionedItemsSection(
      bubble,
      `Images (${images.length})`,
      images,
      (im) => buildStandaloneImageBlock(im.alt, im.id, images),
      accordionGroup
    );

    addSourcesBlock(bubble, ranked);

    scrollRowToTop(row);
    return row;
  }

  function addRelatedChips(sections) {
    if (!sections.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'ea-row ea-bot';
    const holder = document.createElement('div');
    holder.id = 'ea-suggestions';
    const label = document.createElement('div');
    label.className = 'ea-related-label';
    label.textContent = 'Related:';
    holder.appendChild(label);
    sections.forEach((section) => {
      const chip = document.createElement('button');
      chip.className = 'ea-chip';
      chip.textContent = section.title;
      chip.addEventListener('click', () => selectSection(section));
      holder.appendChild(chip);
    });
    wrap.appendChild(holder);
    messages.appendChild(wrap);

  }

  function addTyping() {
    const row = document.createElement('div');
    row.className = 'ea-row ea-bot';
    row.innerHTML = `<div class="ea-bubble ea-typing-row"><div class="ea-typing"><span></span><span></span><span></span></div><span class="ea-typing-label">Searching the SOP…</span></div>`;
    messages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function showEmptyState() {
    if (messages.dataset.greeted) return;
    messages.dataset.greeted = '1';
    messages.classList.add('ea-empty-mode');

    const empty = document.createElement('div');
    empty.className = 'ea-empty';
    empty.innerHTML = `
      <div class="ea-empty-logo">SOP</div>
      <h2 class="ea-empty-title">SOP Assistant</h2>
      <p class="ea-empty-sub">Search the SOP. Ask a question or pick a topic to start.</p>
      <div class="ea-empty-chips"></div>
    `;
    const holder = empty.querySelector('.ea-empty-chips');
    SUGGESTIONS.forEach((s) => {
      const chip = document.createElement('button');
      chip.className = 'ea-chip';
      chip.textContent = s;
      chip.addEventListener('click', () => {
        input.value = s;
        updateSendState();
        handleSend();
      });
      holder.appendChild(chip);
    });
    messages.appendChild(empty);
  }

  function clearEmptyState() {
    messages.classList.remove('ea-empty-mode');
    const empty = messages.querySelector('.ea-empty');
    if (empty) empty.remove();
  }

  function openPanel() {
    panel.classList.add('ea-open');
    scrim.classList.add('ea-open');
    panel.setAttribute('aria-hidden', 'false');
    launcher.style.display = 'none';
    showEmptyState();
    setTimeout(() => input.focus(), 200);
  }

  function closePanel() {
    panel.classList.remove('ea-open');
    scrim.classList.remove('ea-open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.style.display = 'flex';
  }

  function autoGrow() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  function updateSendState() {
    sendBtn.disabled = input.value.trim().length === 0;
  }

  const SHOWN_RELEVANCE_RATIO = 0.6;
  const MAX_SHOWN_CHUNKS = 6;

  function selectShownChunks(ranked) {
    const top = ranked[0];
    const shown = [top];
    for (let i = 1; i < ranked.length && shown.length < MAX_SHOWN_CHUNKS; i += 1) {
      const r = ranked[i];
      const samePage = r.chunk.page === top.chunk.page;

      const closeTier = r.tier <= top.tier + 1;
      const closeScore = r.combined >= top.combined * SHOWN_RELEVANCE_RATIO;
      if (samePage || (closeTier && closeScore)) shown.push(r);
    }
    return shown;
  }

  function countMatchingIndexedElements(query, sectionId) {
    if (!sectionId) return 0;
    const queryKeywords = buildQueryUnderstanding(query).keywords;
    if (!queryKeywords.length) return 0;
    const items = getComprehensiveIndex().bySection.get(sectionId) || [];
    return items.filter((item) => {
      const itemTokens = tokenize(item.text);
      return queryKeywords.some((t) => itemTokens.includes(t));
    }).length;
  }

  function queryMatchQualityFromTier(tier) {
    if (tier === 0) return 1;
    if (tier === FIELD_TIER_HEADING) return 0.85;
    if (tier === FIELD_TIER_SUBHEADING) return 0.75;
    if (tier === FIELD_TIER_KEYWORD) return 0.6;
    if (tier === FIELD_TIER_ALIAS) return 0.45;
    if (tier === 1) return 0.5;
    if (tier === 2) return 0.4;
    if (tier <= 4) return 0.25;
    return 0.1;
  }

  const RETRIEVAL_QUALITY_LOW_THRESHOLD = 0.35;

  function assessRetrievalQuality(query, ranked) {
    if (!ranked.length) {
      return {
        label: 'Low', score: 0, confidence: null, coverageScore: 0,
        rankingSeparation: 0, matchingElements: 0, queryMatchQuality: 0,
      };
    }

    const top = ranked[0];
    const confidence = computeRetrievalConfidence(query, ranked);
    const coverageScore = computeCoverageScore(query, ranked);
    const rankingSeparation = topResultScoreGap(ranked);
    const matchingElements = countMatchingIndexedElements(query, top.chunk.page);
    const queryMatchQuality = queryMatchQualityFromTier(top.tier);

    const elementSupport = Math.min(matchingElements, 5) / 5;
    const score = (Math.min(confidence.score, 10) / 10) * 0.3
      + coverageScore * 0.25
      + rankingSeparation * 0.15
      + elementSupport * 0.1
      + queryMatchQuality * 0.2;

    const label = (top.tier === 0 || score >= RETRIEVAL_QUALITY_LOW_THRESHOLD) ? 'High' : 'Low';
    return { label, score, confidence, coverageScore, rankingSeparation, matchingElements, queryMatchQuality };
  }

  async function respond(query) {
    const ranked = titleFirstRetrieval(query);

    if (!ranked.length) {

      await addMessage('No relevant SOP content found.', 'bot');
      return;
    }

    const quality = assessRetrievalQuality(query, ranked);
    if (DEBUG_SEARCH) {
      console.log('[SOP Assistant] Retrieval quality \u2014', {
        query,
        label: quality.label,
        score: Number(quality.score.toFixed(2)),
        confidence: quality.confidence && quality.confidence.label,
        coverageScore: Number(quality.coverageScore.toFixed(2)),
        rankingSeparation: Number(quality.rankingSeparation.toFixed(2)),
        matchingElements: quality.matchingElements,
        queryMatchQuality: Number(quality.queryMatchQuality.toFixed(2)),
      });
    }
    if (quality.label === 'Low') {
      const closestTopics = [];
      const seenIds = new Set();
      for (const r of ranked) {
        if (seenIds.has(r.chunk.page)) continue;
        seenIds.add(r.chunk.page);
        const section = getSopById().get(r.chunk.page);
        if (section) closestTopics.push(section);
        if (closestTopics.length >= 3) break;
      }
      await addMessage(
        "I couldn't find a confident match in the SOP for this question. Here are the closest topics \u2014 pick one, or try rephrasing your question.",
        'bot'
      );
      addRelatedChips(closestTopics);
      return;
    }

    const shown = selectShownChunks(ranked);

    if (DEBUG_SEARCH && lastSearchDebug) {
      logRetrievalDebug({
        ...lastSearchDebug,
        chunksSelected: ranked.length,
        chunksSentToAI: shown.length,
        topChunkId: ranked[0].chunk.id,
        shownChunkIds: new Set(shown.map((r) => r.chunk.id)),
      });
    }

    await addAnswerMessage(query, shown);

    const shownPages = new Set(shown.map((r) => r.chunk.page));
    const related = [];
    for (const r of ranked.slice(shown.length)) {
      if (shownPages.has(r.chunk.page) || related.some((s) => s.id === r.chunk.page)) continue;
      const section = getSopById().get(r.chunk.page);
      if (section) related.push(section);
      if (related.length >= 3) break;
    }
    addRelatedChips(related);
  }

  function handleSend() {
    const text = input.value.trim();

    if (!text) return;

    hideSuggest();
    clearEmptyState();
    addMessage(text, 'user');
    input.value = '';
    autoGrow();
    updateSendState();

    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      respond(text);
    }, 550);
  }

  function selectSection(section) {
    hideSuggest();
    clearEmptyState();
    input.value = '';
    autoGrow();
    updateSendState();
    addMessage(plainTitle(section).replace(/\b\w/g, (c) => c.toUpperCase()), 'user');
    const typing = addTyping();
    setTimeout(async () => {
      typing.remove();
      const ranked = chunkSection(section).map((chunk) => ({ chunk }));
      await addAnswerMessage(plainTitle(section), ranked, 'Here\u2019s what the SOP says:');
      const related = searchSOP(plainTitle(section))
        .map((r) => r.section)
        .filter((s) => s.id !== section.id)
        .slice(0, 3);
      addRelatedChips(related);
    }, 400);
  }

  let suggestItems = [];
  let suggestActive = -1;

  function hideSuggest() {
    clearTimeout(suggestDebounceId);
    suggestPop.classList.remove('ea-show');
    suggestPop.innerHTML = '';
    suggestItems = [];
    suggestActive = -1;
  }

  function highlightMatch(text, query) {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean).map(escapeRe);
    if (!tokens.length) return document.createTextNode(text);
    const re = new RegExp('(' + tokens.join('|') + ')', 'ig');
    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const b = document.createElement('span');
      b.className = 'ea-suggest-hl';
      b.textContent = m[0];
      frag.appendChild(b);
      last = m.index + m[0].length;
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  function chooseSuggestion(item) {
    hideSuggest();
    input.value = item.phrase;
    autoGrow();
    updateSendState();
    handleSend();
  }

  function renderSuggest(query) {
    const q = query.trim();
    if (!q) { hideSuggest(); return; }

    const results = suggestPhrases(q);
    suggestPop.innerHTML = '';
    suggestItems = results;
    suggestActive = -1;

    if (!results.length) {
      const empty = document.createElement('div');
      empty.className = 'ea-suggest-empty';
      empty.textContent = 'No matching topics found.';
      suggestPop.appendChild(empty);
      suggestPop.classList.add('ea-show');
      return;
    }

    results.forEach((item, i) => {
      const { section, phrase, heading } = item;
      const el = document.createElement('div');
      el.className = 'ea-suggest-item';
      el.setAttribute('role', 'option');
      el.innerHTML = '<svg class="ea-si-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z"/></svg>';

      const body = document.createElement('div');
      body.className = 'ea-si-body';

      const label = document.createElement('div');
      label.className = 'ea-si-title';
      label.appendChild(highlightMatch(phrase, q));
      body.appendChild(label);

      const meta = document.createElement('div');
      meta.className = 'ea-si-meta';
      const loc = document.createElement('span');
      loc.className = 'ea-si-kw';
      loc.textContent = heading ? plainTitle(section).replace(/\b\w/g, (c) => c.toUpperCase()) : 'Overview';
      meta.appendChild(loc);
      meta.appendChild(document.createTextNode(` · Title ${section.id}`));
      body.appendChild(meta);

      el.appendChild(body);
      el.addEventListener('mousedown', (e) => { e.preventDefault(); chooseSuggestion(item); });
      el.addEventListener('mouseenter', () => setActiveSuggest(i));
      suggestPop.appendChild(el);
    });
    suggestPop.classList.add('ea-show');
  }

  function setActiveSuggest(i) {
    suggestActive = i;
    Array.from(suggestPop.children).forEach((el, idx) => {
      el.classList.toggle('ea-active', idx === i);
    });
  }

  closeBtn.addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);
  sendBtn.addEventListener('click', handleSend);

  let suggestDebounceId = null;
  input.addEventListener('input', () => {
    autoGrow();
    updateSendState();
    const value = input.value;
    clearTimeout(suggestDebounceId);
    suggestDebounceId = setTimeout(() => renderSuggest(value), 270);
  });
  input.addEventListener('keydown', (e) => {
    const open = suggestPop.classList.contains('ea-show');
    if (open && e.key === 'ArrowDown' && suggestItems.length) {
      e.preventDefault();
      setActiveSuggest((suggestActive + 1) % suggestItems.length);
      return;
    }
    if (open && e.key === 'ArrowUp' && suggestItems.length) {
      e.preventDefault();
      setActiveSuggest((suggestActive - 1 + suggestItems.length) % suggestItems.length);
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (open && suggestActive >= 0 && suggestItems.length) {
        chooseSuggestion(suggestItems[suggestActive]);
      } else {
        handleSend();
      }
      return;
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      e.stopPropagation();
      hideSuggest();
    }
  });
  input.addEventListener('blur', () => setTimeout(hideSuggest, 120));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !suggestPop.classList.contains('ea-show') && panel.classList.contains('ea-open')) closePanel();
  });

  loadSopData().then(() => {
    input.disabled = false;
    input.placeholder = DEFAULT_PLACEHOLDER;
    runSearchTestsIfEnabled();
  });

  if (window.SOP_DEMO_AUTO_OPEN) openPanel();
  }

  function isEntityDetailUrl() {
    return true;
  }

  let assistantInitialized = false;
  let assistantRoot = null;

  function showAssistant() {
    if (!assistantInitialized) {
      assistantInitialized = true;
      initAssistant();
      assistantRoot = document.getElementById(PANEL_ID);
      return;
    }
    if (assistantRoot && !assistantRoot.isConnected) {
      document.body.appendChild(assistantRoot);
    }
  }

  function hideAssistant() {
    if (assistantRoot && assistantRoot.isConnected) {
      assistantRoot.remove();
    }
  }

  function syncAssistantVisibility() {
    if (isEntityDetailUrl()) showAssistant();
    else hideAssistant();
  }

  syncAssistantVisibility();

  const _pushState = history.pushState;
  const _replaceState = history.replaceState;
  history.pushState = function (...args) {
    const ret = _pushState.apply(this, args);
    syncAssistantVisibility();
    return ret;
  };
  history.replaceState = function (...args) {
    const ret = _replaceState.apply(this, args);
    syncAssistantVisibility();
    return ret;
  };
  window.addEventListener('popstate', syncAssistantVisibility);
  window.addEventListener('hashchange', syncAssistantVisibility);

  let lastHref = location.href;
  setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      syncAssistantVisibility();
    }
  }, 500);
})();

