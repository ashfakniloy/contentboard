# Contentboard | Blog and contact management dashboard for websites

![Project Screenshot](/public/images/contentboard-cover.webp)

Contentboard is a full-stack blog and contact management dashboard for websites, built with Next.js 14 (app router). This project allows website owners to write blog articles and manage the contact section for their websites by connecting their websites with APIs.

## Live Demo

[Explore the Live Demo](https://contentboard.vercel.app)

## Tech Stack

- Next.js (app router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma
- MongoDB
- Cloudinary
- NextAuth
- Tiptap
- React Hook Form
- Zod

## Key Features

- User Registration: Users can register with an email account (no email verification required, for demonstration purposes only).
- Blog Article Management: Users can create blog articles using a rich text editor and perform editing and deletion actions. Later, users can connect their website with APIs provided by the dashboard to display blogs on their websites along with CSS.
- Media Upload: Users can upload images with image titles, alt text, and later use those images in their blogs.
- Blog Analytics: Users can view their website's blog articles unique visitor views with data visualization charts for every year, along with visitor counts from desktop and mobile.
- Contact Management: Users can manage the contact submission section of their websites using APIs provided by the dashboard, allowing their websites visitors to communicate with them.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB database configured.
- Cloudinary account set up.
- Other dependencies installed (specified in package.json).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashfakniloy/contentboard.git
   cd contentboard
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

### Configuration

1.  Create a `.env` file in the project root and set the required environment variables:

    ```bash
    DATABASE_URL=
    NEXTAUTH_SECRET=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
    NEXT_PUBLIC_CLOUDINARY_FOLDER=
    NEXT_PUBLIC_BASE_URL=
    ```

### Setting Up the Database

1.  To initialize your database schema, run the following command:

    `npx prisma db push`

    This command will create the necessary tables and schema in your MongoDB database based on your Prisma schema definition.

2.  After successfully pushing the database schema, you can apply any pending migrations (if applicable) using:

    `npx prisma migrate dev`

    This command will apply any pending migrations to the database.

### Running the Development Server

1.  Start the development server:

    `npm run dev`

2.  Open your web browser and navigate to [http://localhost:3000](http://localhost:3000/) to access the project locally.

### Building for Production

1.  To build the project for production, use the following command:

    `npm run build`

2.  Start the production server:

    `npm start`

Now, your project is up and running locally with the database set up and ready for use.

## Author

### Ashfak Ahmed Niloy

- Email: ashfakniloy@gmail.com
- Portfolio: https://niloy.vercel.app
- GitHub: https://github.com/ashfakniloy
