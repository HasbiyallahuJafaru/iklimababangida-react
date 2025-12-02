# Iklima Babangida Portfolio - React + Vite Migration

This project is a complete React + Vite conversion of the Iklima Babangida portfolio website.

## 📁 Project Structure

```
iklimababangida-react/
├── public/                  # Static assets
├── src/
│   ├── assets/
│   │   └── images/         # Image assets
│   ├── components/         # Reusable React components
│   │   ├── Layout.jsx     # Main layout wrapper
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── Footer.jsx     # Footer component
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   ├── About.jsx      # About page
│   │   ├── Portfolio.jsx  # Portfolio page
│   │   ├── Contact.jsx    # Contact page
│   │   ├── AdminLogin.jsx # Admin login
│   │   └── AdminDashboard.jsx # Admin dashboard
│   ├── services/          # API services
│   │   ├── supabase.js    # Supabase client & functions
│   │   └── cloudinary.js  # Cloudinary service
│   ├── utils/             # Utility functions
│   │   └── helpers.js     # Helper functions
│   ├── App.jsx            # Main App component
│   ├── App.css            # App styles
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for backend)
- Cloudinary account (for image hosting)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd iklimababangida-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   ```

4. **Set up Supabase:**
   
   Create the following tables in your Supabase project:
   
   **Portfolio table:**
   ```sql
   create table portfolio (
     id uuid default uuid_generate_v4() primary key,
     title text not null,
     description text,
     category text,
     image_url text,
     featured boolean default false,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```
   
   **Articles table:**
   ```sql
   create table articles (
     id uuid default uuid_generate_v4() primary key,
     title text not null,
     content text,
     excerpt text,
     image_url text,
     published_at timestamp with time zone default timezone('utc'::text, now()),
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Public Pages
- **Home** - Hero section, featured work, about preview, latest articles
- **About** - Personal bio, skills, experience timeline, education, awards
- **Portfolio** - Filterable gallery with modal details
- **Contact** - Contact form with validation, contact information

### Admin Pages
- **Admin Login** - Secure authentication
- **Admin Dashboard** - Manage portfolio items, articles, and settings

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **TailwindCSS** - Styling framework
- **Supabase** - Backend and database
- **Cloudinary** - Image hosting and optimization

## 🔐 Authentication

The admin section uses Supabase authentication. Make sure to:
1. Enable email authentication in your Supabase project
2. Create an admin user in Supabase Auth
3. Set up Row Level Security (RLS) policies for your tables

## 📦 Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist/` directory

3. Deploy to your hosting platform (Netlify, Vercel, etc.)

## 🌐 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project from GitHub
2. Framework preset: Vite
3. Add environment variables in Vercel dashboard

## 📄 Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Your Cloudinary upload preset

## 🐛 Troubleshooting

### Module not found errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
- Restart the dev server after changing `.env`
- Ensure variables are prefixed with `VITE_`
- Check that `.env` is not in `.gitignore`

### Build errors
- Run `npm run lint` to check for code issues
- Ensure all imports are correct
- Check browser console for errors

## 📞 Support

For issues or questions, please contact the development team.

## 📜 License

Copyright © 2024 Iklima Babangida. All rights reserved.
