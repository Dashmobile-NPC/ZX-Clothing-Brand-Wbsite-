# ZANADRAXLILTH

Premium South African streetwear website.

## GitHub Pages

This project already includes `.github/workflows/deploy.yml` for GitHub Pages.

1. Create a **public** GitHub repository.
2. Upload all files and folders in this project.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** if it isn't already selected.
5. Push to the `main` branch. The workflow deploys the site automatically.
6. Open the Pages URL shown in **Settings → Pages**.

## Install as an app

The project is configured as a Progressive Web App (PWA).

On a supported phone browser, open the GitHub Pages website and choose **Add to Home screen** or **Install app**.

The PWA files are:
- `manifest.json`
- `sw.js`
- `assets/icon-192.png`
- `assets/icon-512.png`

The service worker caches the main site shell for a better offline experience.

## Important

The current checkout, account and contact features are demo/front-end features. A real store needs a secure backend, payment provider, database, authentication and order processing before accepting real customer payments.
