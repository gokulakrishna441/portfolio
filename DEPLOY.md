# Deploy Guide — Free tier for gokulakrishna441

**Your accounts**
- GitHub: https://github.com/gokulakrishna441
- Vercel team: https://vercel.com/code-with-gk

Suggested repo name: `portfolio`  
Suggested live URL after Vercel: `https://portfolio-code-with-gk.vercel.app` (exact URL is shown after deploy)

## Is everything free?

**Yes for a personal portfolio**, with free-tier limits:

| Service | Role | Free? | Notes |
|---------|------|-------|-------|
| **GitHub** | Code hosting | Yes | Free for private/public repos |
| **Vercel Hobby** | React frontend | Yes | Bandwidth/build limits; fine for portfolio |
| **Render Free** | Node/Express API | Yes | Spins down after idle (~50s cold start) |
| **MongoDB Atlas M0** | Database | Yes | 512MB storage |
| **Gmail SMTP** | Contact emails | Yes | Use App Password |

> Vercel alone cannot run your full Express + MongoDB API well as a classic server.  
> Free setup = **Vercel (frontend) + Render (backend) + Atlas (database)**.

Paid only if you later want: custom domain extras, always-on API, more DB storage, team features.

---

## 1) MongoDB Atlas (free database)

1. Create account at https://www.mongodb.com/cloud/atlas  
2. Create a **Free M0** cluster  
3. Database Access → create user + password  
4. Network Access → **Allow from anywhere** `0.0.0.0/0` (needed for Render)  
5. Connect → Drivers → copy URI like:

```text
mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/gokula_portfolio?retryWrites=true&w=majority
```

---

## 2) Push project to GitHub

In PowerShell:

```powershell
cd d:\Gokulakrishna\portfolio
git init
git add .
git commit -m "Initial MERN portfolio"
```

Create a repo on GitHub (e.g. `gokula-portfolio`), then:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gokula-portfolio.git
git push -u origin main
```

---

## 3) Deploy API on Render (free)

1. https://render.com → New → **Web Service** → connect GitHub repo  
2. Settings:
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance:** Free
3. Environment variables:

```text
NODE_ENV=production
MONGODB_URI=your_atlas_uri
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@gokulakrishna.dev
ADMIN_PASSWORD=your_secure_password
CONTACT_TO=gokulakrishna441@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=gokulakrishna441@gmail.com
SMTP_PASS=your_gmail_app_password
```

4. Deploy → copy API URL, e.g. `https://gokula-portfolio-api.onrender.com`  
5. Seed once (Render Shell or local against Atlas):

```powershell
cd server
# temporarily set MONGODB_URI to Atlas in .env
npm run seed
```

Health check: `https://YOUR_API.onrender.com/api/health`

---

## 4) Deploy frontend on Vercel (free)

1. https://vercel.com → Add New Project → import GitHub repo  
2. Configure:
   - **Root Directory:** `client`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Environment variable:

```text
VITE_API_URL=https://YOUR_API.onrender.com/api
```

4. Deploy → open your `*.vercel.app` URL  
5. Go back to Render and set `CLIENT_URL` to that Vercel URL (exact origin, no trailing slash). Redeploy API if needed.

---

## 5) Optional: custom domain

- Add domain in Vercel (often free on Hobby for 1 domain)
- Point DNS as Vercel instructs
- Update `CLIENT_URL` on Render to your domain

---

## After deploy checklist

- [ ] `/api/health` returns OK  
- [ ] Site loads projects/skills from API  
- [ ] Contact form saves message (Admin → Messages)  
- [ ] Resume download works  
- [ ] Admin login works with your production password  

---

## Important free-tier caveats

1. **Render free** sleeps when idle → first API request can take 30–60 seconds  
2. **Do not commit** `.env` files with secrets  
3. Change default admin password before going public  
4. Resume uploads on free disk may reset on Render — seed PDF or use cloud storage later  

---

## Local vs production URLs

| Env | Frontend | API |
|-----|----------|-----|
| Local | http://localhost:5173 | http://localhost:5000/api |
| Prod | https://….vercel.app | https://….onrender.com/api |
