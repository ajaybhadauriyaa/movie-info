# Movie Info App

A React + TypeScript application bootstrapped with Vite. This app allows users to search for movies, view details, and manage a list of selected movies.

> **Note:** A `.env` file has been included in this project for testing purposes. Since this is primarily a test or demo project, environment-specific configurations are kept minimal.

## Folder Structure

```
movie-info/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable React components
│   ├── features/           # Redux slices and API logic
│   ├── pages/              # Page-level components
│   ├── routes/             # App route definitions
│   ├── store/              # Redux store setup
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd movie-info
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the app for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```
