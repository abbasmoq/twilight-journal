# Adventure Journals

A lightweight, bilingual, spoiler-conscious game progress tracker.

یک دفترچهٔ دوزبانه و سبک برای ثبت پیشرفت، مأموریت‌ها و خاطرات بازی.

## Live App

**https://abbasmoq.github.io/twilight-journal/**

## Supported Games

- The Legend of Zelda: Twilight Princess HD
- The Legend of Zelda: The Wind Waker HD

Open the game selector from the controller button at the top of either journal.

## Features

- Progressive Main Journey chapters
- Side quests, equipment, collectibles, and notes
- Persian and English interfaces
- Separate local saves for every game
- Optional username/password accounts
- Supabase Cloud Save across mobile and desktop
- Guest mode without an account
- Mobile-friendly design

## Privacy

No real email address is requested by the app. Guest progress stays in the browser. Account saves are protected by Supabase Row Level Security so each signed-in user can access only their own records.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

> This is an unofficial fan-made project and is not affiliated with Nintendo.
