# NextJS Simple Blog

## List of technologies

### Frontend

- next 14
- react 18
- nextui
- swr
- date-fns
- tailwindcss


### Backend

- strapi
- faker-js


## Getting started

This monorepo houses two separate packages - `frontend` and `backend`, representing respective parts of the application.

## Installation

I use Yarn, please refer to [yarn docs](https://yarnpkg.com/getting-started/install).

> chances are, your node version already has it, you just have to enable it and run `yarn install`.

Both packages use `workspaces` hoisting limit, indicating that relevant dependencies will be installed on a package-level, rather that a project-level.

To start the project, follow next steps:

```bash
# Clone repository
git clone git@github.com:tony-37/nextjs-simple-blog.git
# Go to project directory
cd nextjs-simple-blog
# Install dependencies
yarn install
# Copy files with environment variables
cp apps/frontend/.env.example apps/frontend/.env && cp apps/backend/.env.example apps/backend/.env
# Launch project
yarn dev
```

The project will be launched in the dev mode, after which the admin panel Strapi will be available at the link `http://localhost:1337/admin/` and the web `http://localhost:3000/`
