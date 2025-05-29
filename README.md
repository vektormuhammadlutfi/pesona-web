# Pesona WEB

**PESONA** is a modern web application built with React and TypeScript, designed to deliver a dynamic and responsive user experience. This application leverages reusable components and strong type definitions to ensure reliability and maintainability.

## Features

- **Responsive Design**: Fully responsive and mobile-friendly user interface.
- **Reusable Components**: Modular UI components for easy maintenance and scalability.
- **State Management**: Effective management of application state with custom hooks.
- **API Integration**: Seamless interaction with backend services via RESTful APIs.
- **Type Safety**: Utilizes TypeScript for robust type checking and reduced runtime errors.

- **Repository Backend**: [Pesona API GitHub](https://github.com/vektormuhammadlutfi/pesona-api)
- **API Endpoint**: [Pesona API Live](https://pesona-api.onrender.com/)

## Directory Structure

```
src/
  components/           # Reusable UI components
    ui/
      accordion.tsx
      alert-dialog.tsx
      ...
    error-boundary.tsx  # Handles application errors
  hooks/               # Custom React hooks
    use-toast.ts
  lib/                 # Libraries and utility functions
    api.ts             # API functions for data fetching
    utils.ts           # General utility functions
  pages/               # Main application pages
    home-page.tsx
    product-detail-page.tsx
  types/               # TypeScript type definitions
    index.ts
  App.css              # Global styles
  App.tsx              # Main application component
  index.tsx            # Application entry point
  routes.tsx           # Application routes configuration
  vite-env.d.ts        # Vite environment declarations
.gitignore             # Files ignored by Git
components.json        # Configuration for component library
eslint.config.js       # ESLint configuration file
index.html             # Main HTML file
package.json           # Project metadata and dependencies
postcss.config.js      # PostCSS configuration
tailwind.config.js     # Tailwind CSS configuration
tsconfig.app.json      # TypeScript configuration for the app
tsconfig.json          # Main TypeScript configuration
vite.config.ts         # Vite configuration file
```

## Installation

To get started with **Project Name**, follow these steps:

### Prerequisites

Make sure you have the following installed:
- **Bun** (latest version)
- **Node.js** (Bun requires Node.js to run)

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the project directory**:
   ```bash
   cd <project-folder>
   ```

3. **Install dependencies using Bun**:
   ```bash
   bun install
   ```

4. **Create a `.env` file** (if applicable) and configure your environment variables.

5. **Start the application**:
   ```bash
   bun run dev
   ```

Open your browser and visit `http://localhost:3000` to view the application.

## Usage

You can explore the features of **Project Name** by navigating through the application. The API endpoints are accessible for integration and testing purposes.

## Contribution

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit them (`git commit -m 'Add a new feature'`).
4. Push your branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact:

- **Name**: Muhammad Lutfi
- **Email**: sainteclutfi@gmail.com
