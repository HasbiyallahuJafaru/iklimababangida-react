# Supabase Authentication Setup Guide

## Overview
The admin login functionality now uses Supabase for secure authentication. Follow these steps to set it up.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Setup Instructions

### 1. Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - Project Name: `iklima-portfolio` (or your preferred name)
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
4. Wait for the project to be created (takes ~2 minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 3. Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Create Admin User in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - Email: Your admin email
   - Password: Your admin password
   - Auto Confirm User: ✅ (checked)
4. Click **"Create user"**

### 5. Optional: Set Up Row Level Security (RLS)

For enhanced security, you can enable RLS on your tables:

1. Go to **Authentication** → **Policies**
2. Enable RLS on any tables you create for portfolio items
3. Create policies that only allow authenticated users to read/write

### 6. Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin` in your browser
3. Try logging in with the admin credentials you created
4. You should be redirected to the dashboard upon successful login

## How It Works

### Login Flow
1. User enters email and password on `/admin` page
2. Credentials are sent to Supabase using `authService.signIn()`
3. Supabase validates credentials and returns a session token
4. Session is stored in localStorage
5. User is redirected to `/admin/dashboard`

### Protected Routes
The dashboard checks authentication on load:
- Verifies active Supabase session
- Redirects to login if session is invalid
- Loads user data if authenticated

### Logout
- Calls `authService.signOut()` to invalidate Supabase session
- Clears localStorage
- Redirects to login page

## Security Features

✅ **Secure Password Storage**: Passwords are hashed by Supabase, never stored in plain text
✅ **JWT Tokens**: Session management using secure JSON Web Tokens
✅ **Session Validation**: Automatic session verification on protected routes
✅ **HTTPS**: All API calls to Supabase are encrypted

## Troubleshooting

### "Invalid credentials" error
- Verify the email/password are correct
- Check that the user exists in Supabase Authentication → Users
- Ensure "Auto Confirm User" was checked when creating the user

### "Supabase environment variables are not set"
- Make sure `.env` file exists in project root
- Verify variable names start with `VITE_`
- Restart dev server after adding/changing `.env`

### Session not persisting
- Check browser console for errors
- Verify Supabase credentials are correct
- Clear browser localStorage and try again

## Next Steps

After setting up authentication, you can:
1. Create database tables for portfolio items
2. Implement CRUD operations using Supabase
3. Add image upload functionality with Cloudinary
4. Set up row-level security policies

## Support

For more information:
- Supabase Documentation: https://supabase.com/docs
- Supabase Auth Guide: https://supabase.com/docs/guides/auth
