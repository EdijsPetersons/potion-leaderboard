# Frontend Developer Challenge

## About Potion Leaderboard

Potion Leaderboard is a gamified platform where every Solana memecoin trader—from beginner to expert—competes, showcases their performance, and wins rewards. The platform’s first MVP includes a public Leaderboards page (with Daily, Weekly, Monthly, and All-Time views) that lists traders’ wallets, performance metrics, profile details, and social connections.

## Challenge Goal

Create a responsive, visually compelling Leaderboard page that fetches and displays trader data from an API. This page should mimic the look and feel outlined in our Figma designs and incorporate core UI interactions such as search and filtering.

## Live demo

Live demo deployed on vercel: <https://potion-leaderboard-ten.vercel.app/>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design decisions

Technologies used:

- Next.js — because I believe the app is going to be mostly static content so it should be faster to load.

- Typescript — Typescript for type safety and better maintainability in the long run.

- Tailwind CSS ( styling ) — Tailwind CSS for styling because it's very easy to use and it's very fast to develop with.

- Shadcn UI ( components ) — Shadcn UI for components as they have almost all the components I need.

- lucide-react ( icons )

- nuqs ( state management in the url ) — nuqs for state management in the url to store filters, sorting, active tabs and search query to make the url easier to bookmark and share.

- Tanstack Query ( data fetching / caching ) — For data fetching and management from the front-end.

- Tanstack Table ( table component ) — Leaderboards and tokens / trades tables.

&nbsp;
Since the export feature was disabled in the figma file, I tried to re-create the logo as close as I could nad made some small design deviations from the figma designs to make it more visually appealing.

## Potential future improvements

Pagination — All the mock data is filtered, searched and paginated in the frontend but in real app with an api it would be better to do that in the backend.

Filters — Could move them inside a form and add proper input validation with zod.

## Scope of Work

Solution should:

- **Data Integration:**
  [x] Consume a mock API endpoint that returns JSON data for traders.
  [x] Display key information for each trader including:
    [x] Wallet address (with a “copy to clipboard” feature)
    [x] Profile picture
    [x] X account handle & follower count
    [x] Current P&L for the selected time period
    [x] *Everything in the Figma designs*
- **UI/UX Requirements:**
  [x] Follow the design from our [Potion Leaderboard Figma designs](https://www.figma.com/design/4UbpftRYpuL5SczCjk9eOW/Potion-Leaderboard?node-id=0-1&t=BewzRrTb97BcxXsf-1) (feel free to interpret and improve for responsiveness and usability).
  [x] Implement a clean, responsive design that works well on desktop and mobile.
  [x] Sorting by the various columns works correctly
  [x] Pagination controls and info for the results
  [x] Provide a search bar to filter wallets by wallet address or X account name.
  [x] Add filters for all data points (in a slide out drawer/pop up) to limit the results by.
- **Technical Requirements:**
  [x] Use a modern frontend framework/library (ex: React or similar).
  [x] It must be written in Javascript or a no-code solution —— I hope Typescript is acceptable
  [x] Code should be clean, well-structured, and documented.
  [x] You may use any CSS framework or styling solution you’re comfortable with.
  [x] Ensure the page gracefully handles loading states and errors from the API.

## Notes

In the interests of saving time — the api responses are simplified and is not how I would structure it in a real production app.

## Functionality testing

All timeframes are using the same data and I've added a small artificial delay to the api responses to simulate a network requests so you should still see a loading state when switching between timeframes.

Tables are simplified on mobile views.

Filters, searching and sorting should be working correctly apart from input validation.

Learn and Prizes links should lead to 404 page.

I've introduced an artifical 10% chance of failure in the api to test error handling.
