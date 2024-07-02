# Habits Frontend

## Overview
Habits Frontend is a Next.js application that interfaces with the Habits API
backend. It allows users to manage their to-do tasks, schedule them, and set
recurring tasks. The application uses TailwindCSS and Shadcn-UI for styling,
Tanstack Query for data fetching, PNPM for package management, and Clerk for
user authentication.

## Features
- User authentication with Clerk
- Manage to-do tasks: create, read, update, and delete
- Schedule tasks with specific dates and times
- Recurring tasks using RRule
- Responsive and modern UI with TailwindCSS and Shadcn-UI

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- PNPM

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/danfrenette/habits-frontend.git
   cd habits-frontend
   ```

2. Install dependencies using PNPM:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of your project and add the necessary environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
   CLERK_API_KEY=<your_clerk_api_key>
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

### Styling
The application uses TailwindCSS for utility-first styling and Shadcn-UI for pre-built components.

- **TailwindCSS**: Configure TailwindCSS in `tailwind.config.js`.
- **Shadcn-UI**: Import and use Shadcn-UI components as needed.

### Data Fetching
Tanstack Query is used for efficient data fetching and state management.

- Configure queries in the `hooks` directory, e.g., `useTodos.js`.

### User Authentication
Clerk is used for user authentication.

- Set up Clerk in `_app.js` and manage authentication flows accordingly.

## Usage
This frontend application is designed to work seamlessly with the Habits API backend. Ensure the backend is running and accessible at the URL specified in your `.env.local` file.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Contact
For any inquiries, please [send me an email](mailto:dan.r.frenette@gmail.com).
