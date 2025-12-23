# Crypto Market Analyzer

A modern, real-time cryptocurrency market analysis tool built with React and TypeScript.

## Project Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Part 2. Documentation & Process

We believe that the journey is just as important as the destination. This section documents the human thought process, technical decisions, and tools used to build Finsphera's Crypto Market Analyzer.

### 1. The Architecture & Tech Stack

Our project structure follows a **feature-based and separation-of-concerns** architecture. This ensures that the codebase remains scalable and maintainable as the application grows.

**Folder Structure:**

- **`src/services/`**: Contains all API logic (Axios calls). We separated this from UI components to make API calls reusable and easily testable.
- **`src/hooks/`**: Custom React hooks (e.g., `useTicker24hr`) encapsulate complex logic and state management, keeping our View components clean and focused on rendering.
- **`src/components/`**: Reusable UI building blocks (e.g., `CryptoCard`, `HistoryChart`) that are agnostic of the specific page they are on.
- **`src/views/`**: Represents the main pages of the application, composing smaller components together.

**Key Technology Choices:**

- **Vite**: Chosen over CRA for its lightning-fast HMR (Hot Module Replacement) and optimized build process.
- **TailwindCSS (v4)**: Selected for its utility-first approach, allowing for rapid UI prototyping and consistent design tokens without context-switching to separate CSS files.
- **Axios**: Preferred over the native `fetch` API for its automatic JSON transformation, better error handling, and ease of use with interceptors.
- **Recharts**: We chose Recharts for the historical data visualization because of its composability and React-centric API, making it easy to integrate responsive charts into our modal system.
- **React Router DOM**: Standard routing solution for SPA navigation.

### 2. AI Usage (Transparency)

- **Type Generation**: We used AI to swiftly generate comprehensive TypeScript interfaces for complex API responses (e.g., raw Klines data arrays), ensuring strict type safety without manually typing every field.
- **Debugging & Logic**: When encountering issues with the Chart History loading state (where charts wouldn't render immediately upon modal open), AI helped diagnose the asynchronous race conditions and suggested a robust loading state pattern.
- **Boilerplate & Refactoring**: AI assisted in scaffolding the initial Vite setup and refactoring inline fetch logic into custom hooks to improve code readability.
- **Documentation**: I used AI to generate this README.md file.

### 3. Design Decisions

- **Dashboard Layout**: The main dashboard is designed for high information density. We prioritized a clear, list-based view that allows users to scan multiple assets' key metrics (Price, 24h Change) at a glance.
- **Modal "Details" View**: Instead of navigating to a separate page for specific coin details, we implemented a **Modal/Overlay** (Bottom Sheet style on mobile, centered modal on desktop).
  - _Why?_ This keeps the user in the context of their list. They can quickly peek at a chart and close it to resume scrolling exactly where they left off, rather than dealing with back-button navigation.
- **Visual Feedback**: We used standard financial color cues (Green for positive, Red for negative) but softened them to fit a modern dark-mode aesthetic, ensuring the app feels professional yet accessible.

### 4. Challenges & Trade-offs

- **Challenge: Real-time Data & Charts**: One hurdle was smoothly integrating the historical chart data with the real-time ticker data. The API for Klines (history) is separate from the Ticker (current price).
  - _Solution_: We implemented an on-demand fetching strategy. We only fetch historical data when the user _clicks_ a card, showing a loading skeleton specifically for the chart while the modal opens immediately.
- **Trade-off: Client-side vs. Server-side**: Currently, features like sorting and filtering are handled client-side.
  - _Implication_: This makes the UI incredibly snappy for the current dataset size (100+ coins). However, if we were to scale to thousands of coins, we would need to refactor this to server-side pagination and sorting to manage memory and performance.
- **Future Improvement**: With more time, I would implement a global store (using Zustand or Redux Toolkit) to better manage the "Favorites" state and cache API responses. Currently, if you navigate away and back, we re-fetch data; caching would further improve the user experience.
