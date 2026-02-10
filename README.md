# Skylark AI Coordinator

This is a Next.js application for coordinating drone and pilot assignments, with AI-powered features.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### 1. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 2. Set up Environment Variables

The project uses Genkit with the Google AI plugin, which requires a Gemini API key.

1.  Create a `.env` file in the root of the project.
2.  Add your Gemini API key to the `.env` file:

```
GEMINI_API_KEY="YOUR_API_KEY"
```

You can get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Servers

You need to run two development servers in separate terminals: one for the Next.js application and one for the Genkit AI flows.

**Terminal 1: Run the Next.js App**

This will start the web application on `http://localhost:9002`.

```bash
npm run dev
```

**Terminal 2: Run Genkit**

This will start the Genkit development server, allowing the app to use the AI features.

```bash
npm run genkit:dev
```

Now you can open your browser and navigate to `http://localhost:9002` to see the application running.
