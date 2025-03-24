# Fetch's Petfinder

A React Vite application for searching and matching dog profiles.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Build](#build)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Setup

This project uses Vite as the build tool and React as the UI library. The project structure follows the standard Vite app structure.

## Environment Variables

The application expects a .env file in the root directory for environment-specific variables. Create a file called .env and add the following (adjust the value as needed):

```bash
VITE_BASE_URL=https://your-backend-api-url.com
```

VITE_BASE_URL: The base URL for your backend API endpoints. This variable is available in your app via import.meta.env.VITE_BASE_URL.

## Development

To start the development server with hot module replacement:

```bash
npm run dev
```

## Build

You can serve the production build locally using:

```bash
npm run build
npm run serve
```

For deployment on platforms such as GitHub Pages, note that this project is configured to use HashRouter (in App.jsx) because GitHub Pages does not support backend routing. This allows the app to rely on the URL hash for navigation.

## Troubleshooting

Ensure that you have the correct version of Node.js installed.
Double-check that the .env file is correctly set up in the root directory.
If you experience issues with routing on deployment, confirm that the app is using HashRouter instead of BrowserRouter.
