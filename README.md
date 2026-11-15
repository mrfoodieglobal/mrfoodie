# Mr Foodie website

A responsive, static fast-food storefront. It includes your supplied logo, menu categories, 22 menu items, add-to-cart ordering, contact links and mobile navigation.

## Run locally
Open `index.html` in a browser. For best results, use a local static server (for example VS Code Live Server).

## Publish from the project root
Upload the contents of this folder (so `index.html` is at the publish root) to Netlify, Cloudflare Pages, GitHub Pages, or your hosting provider's public root (`public_html`).

## How ordering works
The checkout builds an order email addressed to `mrfoodieglobal@gmail.com` and opens Gmail's compose screen. The customer must press **Send**. This is a no-backend static-site setup; it does not silently send mail or store orders. For automatic email delivery without the customer's mail app, connect a backend or a form/email service and configure its credentials.

## Photos
Food photos are loaded from Unsplash image CDN, so the published site needs an internet connection to display them. The supplied Mr Foodie logo is stored locally at `assets/logo.png`.

## Edit menu and prices
Edit the `products` array near the top of `script.js`. Prices are sample PKR prices and can be changed before launch.
