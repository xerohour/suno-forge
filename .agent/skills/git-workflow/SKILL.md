---
name: Git and GitHub Workflow
description: Version control practices and GitHub workflows for suno-forge
---

# Git and GitHub Workflow Skill

This skill covers Git and GitHub best practices for the suno-forge project.

## Commit Guidelines

### Commit Message Format
Use imperative mood (as documented in AGENTS.md):
```bash
# Good
git commit -m "Fix instrumental style conflict"
git commit -m "Add tempo variation to mutation engine"
git commit -m "Update StyleControls component layout"

# Avoid
git commit -m "Fixed bug"
git commit -m "Changes"
git commit -m "Updated files"
```

### Commit Scope
Keep commits focused on one logical change:
```bash
# Good: Single logical change
git add lib/styleEngine.ts lib/styleEngine.test.ts
git commit -m "Add synthwave genre to style engine"

# Avoid: Multiple unrelated changes
git add lib/styleEngine.ts app/studio/page.tsx components/Header.tsx
git commit -m "Various updates"
```

## Branch Strategy

### Creating Feature Branches
```bash
# Create and switch to new branch
git checkout -b feature/add-tempo-mutations

# Or for bug fixes
git checkout -b fix/instrumental-lyrics-conflict

# Or for documentation
git checkout -b docs/update-api-examples
```

### Branch Naming Conventions
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates
- `test/description` - Test additions/updates

## Common Git Commands

### Checking Status
```bash
# See what's changed
git status

# See detailed diff
git diff

# See staged changes
git diff --cached
```

### Staging Changes
```bash
# Stage specific files
git add lib/promptEngine.ts

# Stage all changes in directory
git add lib/

# Stage all changes (use carefully)
git add .

# Interactive staging
git add -p
```

### Committing
```bash
# Commit staged changes
git commit -m "Add vision engine for image-to-prompt"

# Stage and commit in one step (tracked files only)
git commit -am "Update prompt generation logic"

# Amend last commit (before pushing)
git commit --amend -m "Updated message"
```

### Pushing and Pulling
```bash
# Push current branch
git push

# Push new branch (first time)
git push -u origin feature/my-feature

# Pull latest changes
git pull

# Pull with rebase
git pull --rebase
```

### Viewing History
```bash
# View commit history
git log

# Compact view
git log --oneline

# Last 5 commits
git log -n 5

# With file changes
git log --stat

# Graphical view
git log --graph --oneline --all
```

## Working with Changes

### Undoing Changes
```bash
# Discard unstaged changes in file
git checkout -- lib/promptEngine.ts

# Unstage file (keep changes)
git reset HEAD lib/promptEngine.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - DANGEROUS
git reset --hard HEAD~1
```

### Stashing Changes
```bash
# Stash current changes
git stash

# Stash with message
git stash save "WIP: refactoring style engine"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Clear all stashes
git stash clear
```

## Pull Request Workflow

### Before Creating PR

1. **Ensure code quality:**
```bash
# Type check
npx tsc --noEmit

# Run tests
npm test

# Build check
npm run build
```

2. **Update from main:**
```bash
git checkout main
git pull
git checkout feature/my-feature
git rebase main
# Or: git merge main
```

3. **Clean up commits (optional):**
```bash
# Interactive rebase to squash/reorder commits
git rebase -i HEAD~3
```

### PR Checklist
Include in PR description:
- [ ] Concise summary of changes
- [ ] Validation steps performed
  - [ ] `npx tsc --noEmit` passed
  - [ ] `npm test` passed
  - [ ] `npm run build` succeeded
- [ ] Screenshots/GIFs for UI changes
- [ ] Linked issue/task (if applicable)

### PR Template Example
```markdown
## Summary
Adds tempo variation mutations to the mutation engine, allowing users to shift tempo up or down while preserving other prompt characteristics.

## Changes
- Added `tempo-shift-up` and `tempo-shift-down` mutation types
- Updated `mutationEngine.ts` with tempo parsing logic
- Added tests in `mutationEngine.test.ts`
- Updated UI in `BatchPage` to expose new mutations

## Validation
- ✅ `npx tsc --noEmit` - no errors
- ✅ `npm test` - all tests passing
- ✅ `npm run build` - successful build
- ✅ Manual testing in `/batch` page

## Screenshots
[Attach screenshots of UI changes]

Closes #42
```

## Handling Merge Conflicts

### When Conflicts Occur
```bash
# After pull/merge/rebase with conflicts
git status  # Shows conflicted files

# Open conflicted files and look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# Resolve by editing file, then:
git add resolved-file.ts
git commit  # Or git rebase --continue
```

### Avoiding Conflicts
- Pull/rebase frequently
- Communicate with team about overlapping work
- Keep changes focused and scoped

## .gitignore

### Current Exclusions
The project `.gitignore` includes:
- `node_modules/`
- `.next/`
- `.env*.local`
- `coverage/`
- Build artifacts

### Adding New Patterns
```bash
# Edit .gitignore
echo "*.log" >> .gitignore
echo ".vscode/" >> .gitignore

# Remove already-tracked files
git rm --cached file-to-ignore.log
git commit -m "Update gitignore to exclude log files"
```

## Useful Aliases

Add to `~/.gitconfig`:
```ini
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = log --graph --oneline --all
  amend = commit --amend --no-edit
```

Usage:
```bash
git st          # Instead of git status
git co main     # Instead of git checkout main
git visual      # Pretty commit graph
```

## GitHub-Specific Features

### Using GitHub CLI (gh)
```bash
# Install: https://cli.github.com/

# Create PR from command line
gh pr create --title "Add tempo mutations" --body "Description here"

# View PRs
gh pr list

# Check out PR locally
gh pr checkout 123

# View PR in browser
gh pr view --web
```

### GitHub Actions
The project may have CI/CD workflows in `.github/workflows/`:
- Automated testing on PR
- Build verification
- Deployment pipelines

Check workflow status:
```bash
gh run list
gh run view <run-id>
```

## Troubleshooting

### Accidentally Committed Secrets
```bash
# Remove from last commit
git reset --soft HEAD~1
git reset HEAD .env.local
git commit -c ORIG_HEAD

# If already pushed - ROTATE THE SECRET immediately
# Then use git-filter-branch or BFG Repo-Cleaner
```

### Detached HEAD State
```bash
# Create branch from current state
git checkout -b recovery-branch

# Or discard and return to branch
git checkout main
```

### Large File Issues
```bash
# Remove large file from history
git filter-branch --tree-filter 'rm -f path/to/large/file' HEAD

# Or use BFG Repo-Cleaner (recommended)
```

## Best Practices

1. **Commit often** - Small, frequent commits are easier to review and revert
2. **Write clear messages** - Future you will thank present you
3. **Test before committing** - Run `npm test` and `npx tsc --noEmit`
4. **Pull before push** - Avoid conflicts by staying up to date
5. **Review your own changes** - Use `git diff` before committing
6. **Keep branches short-lived** - Merge frequently to avoid drift
7. **Never commit secrets** - Use `.env.local` and keep it in `.gitignore`
