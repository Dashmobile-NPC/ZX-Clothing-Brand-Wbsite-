# ZANADRAXLILTH Website

Premium black-and-white streetwear storefront for ZANADRAXLILTH.

## Included
- Responsive homepage, shop, new drop, collections, about, lookbook and contact sections
- Product filtering and sorting
- Product detail modal with sizes and quantity
- Cart stored in browser localStorage
- Demo checkout flow
- Newsletter signup stored locally
- Customer account placeholder
- Owner admin dashboard at `admin.html`
- Editable product price, stock, category, NEW and SOLD OUT status
- Editable next-drop countdown
- Official supplied logo assets, plus a cropped ZX mark made from the supplied logo

## Run
Open `index.html` in a modern browser, or serve the folder with any static web server.

## Before launch
This is a front-end storefront demo. For a real e-commerce launch, connect:
- product/order database
- secure admin authentication
- customer accounts
- payment provider
- shipping rates and tracking
- transactional email
- live Instagram/TikTok/Facebook URLs
- final shipping, returns, privacy and terms content

No payment is processed by this demo.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml`.

To publish the website:
1. Create a GitHub repository.
2. Upload the website files, including the `.github` folder.
3. Push the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. The workflow will deploy the website automatically whenever you push to `main`.

Workflow file:
`.github/workflows/deploy.yml`


## Recent updates
- Added a premium animated loading screen with ZX mark, progress animation and loading metadata.
- Added a dedicated `terms.html` Terms & Conditions page.
- Updated the footer Terms & Conditions link to open the new page.
