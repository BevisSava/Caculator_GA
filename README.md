# Calculator

A web-based handheld calculator simulator built with React 18 and Vite. The application continuous integration and deployment (CI/CD) via GitHub Actions.

![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-5.7-e91e63)
![Vitest](https://img.shields.io/badge/Vitest-2.1-729b1b?logo=vitest&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Key Features

- **Core Calculations**: Addition (`+`), subtraction (`-`), multiplication (`×`), and division (`÷`) with division-by-zero protection.
- **Utility Operations**: Percentage (`%`), sign toggle (`+/-`), backspace (`⌫`), and clear all (`AC`).
- **Data Formatting**: Thousand separators (`1,000,000`), decimal normalization, and exponential notation for large numbers.
- **SOA and Adapter Pattern Implementation**:
  - Pure calculation service (`engine.js`).
  - Adapter layer (`calculatorAdapter.js`) decoupling application state and business logic from the UI.
  - Runtime service metadata panel showing service name, version, port, and health status.
- **Session History**: Calculation log drawer with instant clearing.
- **Modern UI**: Dark glassmorphic design with responsive display auto-scaling and React Icons toolbar controls.
- **Automated Testing & CI/CD**: 38 Vitest unit tests and GitHub Actions deployment to GitHub Pages.

---

## Architecture Overview

The system follows a 4-tier separation of concerns:

```
+-------------------------------------------------------+
|                  Presentation Layer                   |
|       (CalculatorApp.jsx, Display.jsx, Keypad.jsx)    |
+---------------------------+---------------------------+
                            | Dispatches user input
+---------------------------v---------------------------+
|                   State Management                    |
|                (CalculatorContext.jsx)                |
+---------------------------+---------------------------+
                            | Delegates state transition
+---------------------------v---------------------------+
|                     Adapter Layer                     |
|                (calculatorAdapter.js)                 |
+---------------------------+---------------------------+
                            | Calls computational services
+---------------------------v---------------------------+
|                  Calculation Engine                   |
|                      (engine.js)                      |
|       [add, subtract, multiply, divide, percent]      |
+-------------------------------------------------------+
```

---

## Project Structure

```text
calculator/
|-- .github/
|   `-- workflows/
|       `-- build_cal.yml     # GitHub Actions pipeline
|-- src/
|   |-- components/
|   |   |-- CalculatorApp.jsx # Root layout and drawer panels
|   |   |-- Display.jsx       # Output screen with dynamic font scaling
|   |   `-- Keypad.jsx        # Button matrix and interaction effects
|   |-- context/
|   |   `-- CalculatorContext.jsx # Application state provider
|   |-- logic/
|   |   |-- calculatorAdapter.js  # SOA adapter and state reducer
|   |   `-- engine.js             # Pure mathematical service functions
|   |-- App.jsx               # Application entry wrapper
|   |-- index.css             # Design tokens and styles
|   `-- main.jsx              # DOM root mount
|-- tests/
|   `-- engine.test.js        # Vitest test suite
|-- index.html                # HTML entry point
|-- package.json              # Dependencies and scripts
`-- vite.config.js            # Vite and Vitest configuration
```

---

## Quick Start

### Prerequisites

- **Node.js**: `18.x` or `20.x` or later
- **npm**: `9.x` or later

Verify versions:
```bash
node -v
npm -v
```

---

### Setup and Execution

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port specified in terminal if 3000 is busy) in your browser.

3. **Run unit tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## Command Reference

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Launch local development server (port 3000 or next available) |
| `npm test` | Execute unit tests once using Vitest |
| `npm run test:watch` | Run tests in interactive watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run build` | Compile and bundle production assets into `dist/` |
| `npm run preview` | Locally serve the compiled `dist/` build |

---

## CI/CD Pipeline

Continuous integration is handled by GitHub Actions (`.github/workflows/build_cal.yml`):

- **Test Matrix**: Automatically executes test suites against Node.js 18 and Node.js 20 on pull requests and pushes.
- **Build**: Compiles production assets and packages them for distribution.
- **Deploy**: Automatically deploys the latest build to GitHub Pages upon pushing to the `main` branch.

---

## License

Distributed under the [MIT License](LICENSE).
