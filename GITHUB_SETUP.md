# 🚀 GitHub Setup Guide

## Step-by-Step Instructions to Push to GitHub

### Option 1: Create New Repository on GitHub (Recommended for new projects)

#### 1. Create Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `secure-pay-benefits-tracker` (or your preferred name)
   - **Description**: "Privacy-first employee time-tracking and compensation calculator"
   - **Visibility**: Choose Public or Private
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

#### 2. Connect Your Local Repository

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project directory
cd /path/to/secure-pay-benefits-tracker

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/secure-pay-benefits-tracker.git

# Rename branch to main (optional, but recommended)
git branch -M main

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

#### 3. Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files!
3. The README.md will display automatically

---

### Option 2: Using GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
# Navigate to project directory
cd /path/to/secure-pay-benefits-tracker

# Create repository and push
gh repo create secure-pay-benefits-tracker --public --source=. --remote=origin --push
```

---

### Option 3: Using GitHub Desktop

1. Open **GitHub Desktop**
2. Click **File** → **Add Local Repository**
3. Browse to your project folder
4. Click **Publish repository**
5. Choose public/private and confirm

---

## After First Push: Making Updates

### Daily Workflow

```bash
# 1. Make your changes to files

# 2. Check what changed
git status

# 3. Stage your changes
git add .
# Or stage specific files:
# git add filename.tsx

# 4. Commit with a message
git commit -m "Description of what you changed"

# 5. Push to GitHub
git push
```

### Example Update Workflow

```bash
# After fixing a bug
git add components/Dashboard.tsx
git commit -m "Fix: Correct overtime calculation in Dashboard"
git push

# After adding a feature
git add components/NewFeature.tsx
git commit -m "Add: New export to PDF feature"
git push
```

---

## Useful Git Commands

### Check Status
```bash
git status              # See what files changed
git log --oneline       # View commit history
git diff                # See what changed in files
```

### Undo Changes
```bash
git checkout -- file.tsx    # Discard changes in a file
git reset HEAD file.tsx     # Unstage a file
git reset --soft HEAD~1     # Undo last commit (keep changes)
```

### Branching
```bash
git checkout -b feature-name    # Create and switch to new branch
git checkout main               # Switch back to main
git merge feature-name          # Merge branch into current branch
```

---

## Setting Up Git (If Not Already Done)

If this is your first time using Git:

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list
```

---

## Authentication Options

### HTTPS (Username + Personal Access Token)

1. Generate a **Personal Access Token** on GitHub:
   - Go to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token (classic)**
   - Select scopes: `repo` (full control)
   - Copy the token

2. When pushing, use token as password:
   - Username: your GitHub username
   - Password: paste your personal access token

### SSH (Recommended for frequent use)

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copy public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. Add to GitHub:
   - Go to **Settings** → **SSH and GPG keys** → **New SSH key**
   - Paste your public key

5. Change remote URL:
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/secure-pay-benefits-tracker.git
   ```

---

## Troubleshooting

### Problem: "Permission denied"
**Solution**: Check your authentication (token or SSH key)

### Problem: "Repository not found"
**Solution**: Check your username and repository name in the remote URL
```bash
git remote -v  # View current remote
git remote set-url origin https://github.com/CORRECT_USERNAME/repo-name.git
```

### Problem: "Updates were rejected"
**Solution**: Pull changes first, then push
```bash
git pull origin main --rebase
git push
```

---

## Best Practices

✅ **Commit often** - Small, focused commits are better
✅ **Write clear commit messages** - Describe what and why
✅ **Pull before push** - Avoid conflicts
✅ **Don't commit sensitive data** - Use .gitignore (already configured)
✅ **Use branches** - For new features or experiments

---

## Next Steps

After pushing to GitHub:

1. ⭐ **Star your own repository** (optional, but fun!)
2. 📝 **Edit repository settings** - Add topics, description
3. 🔒 **Review .gitignore** - Ensure sensitive files excluded
4. 📄 **Add GitHub badges** - Build status, license badges
5. 🌐 **Enable GitHub Pages** - Deploy your app (optional)
6. 🤝 **Invite collaborators** - If working with others

---

## Need Help?

- 📚 [GitHub Docs](https://docs.github.com)
- 💬 [GitHub Community](https://github.community)
- 📖 [Git Documentation](https://git-scm.com/doc)

---

**Your repository is ready to push!** 🎉

Just run these commands (after creating the GitHub repository):

```bash
git remote add origin https://github.com/YOUR_USERNAME/secure-pay-benefits-tracker.git
git branch -M main
git push -u origin main
```
