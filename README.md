# Creative Qraft

A lightweight, multi-page creative studio website built with plain HTML, CSS, and JavaScript. The deployable site lives in `public/`; there are no build steps or package dependencies.

## Pages

- `public/index.html` — homepage
- `public/services.html` — services
- `public/portfolio.html` — selected work
- `public/about.html` — team and studio
- `public/testimonial.html` — project approach
- `public/blog.html` — practical insights
- `public/contact.html` — project enquiries

## Local preview

Open `public/index.html` in a browser, or serve the `public` folder with any static file server.

## Vercel

The project is static. Set the Vercel project’s **Output Directory** to `public` in its build settings. No framework preset or build command is required.

## Before publishing

- Replace `public/assets/logo-placeholder.svg` with the final logo and update the image source in the navigation and footer of each page.
- Confirm the contact email in `public/contact.html` is the correct monitored address. The contact form opens a prefilled draft in the visitor’s email app; it does not submit to a server.
- Replace any portfolio or team images and descriptions that do not represent current work.
