# Push Plan — khadane-dev → main

Follow this checklist every time work on `khadane-dev` is pushed or merged into `main`.
Do not skip steps. Do not push straight to `main` from this worktree.

## Layout

| Worktree | Path | Branch |
|---|---|---|
| Main | `/Users/ankit_gupta/WebstormProjects/mlfinal.com` | `main` (tracks `origin/main`) |
| Khadane | `/Users/ankit_gupta/WebstormProjects/mlfinal-khadane` | `khadane-dev` |

Remote: `origin` → https://github.com/Ankitrajofficial/mlfinal.com

Both worktrees share one `.git`. `main` cannot be checked out here, and `khadane-dev`
cannot be checked out there. Never `cd` between worktrees inside a Claude session.

## Step 1 — Commit everything

```bash
git status
```

- Working tree must be clean. Uncommitted edits are NOT carried by a merge.
- Commit message style: `AREA: what changed` (e.g. `KHADANE: ...`, `CATALOGUE: ...`, `ENQUIRY: ...`, `CHORE: ...`).
- End commit messages with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` when Claude authored the commit.

## Step 2 — Verify the build

```bash
npx tsc --noEmit
npm run build
```

- Both must pass. If either fails, fix and re-commit before continuing.

## Step 3 — Sync with main

```bash
git fetch origin
git log --oneline HEAD..origin/main
```

- If the log is empty, `khadane-dev` is up to date. Continue to Step 4.
- If it lists commits, merge them in first and resolve conflicts here, on the branch:

```bash
git merge origin/main
npx tsc --noEmit
```

## Step 4 — Push the branch

```bash
git push -u origin khadane-dev
```

- First push needs `-u` to set the upstream. Later pushes can be plain `git push`.
- Never use `--force` on `main`. On `khadane-dev`, only `--force-with-lease`, and only if a rebase was deliberate.

## Step 5 — Open the pull request

```bash
gh pr create --base main --head khadane-dev --title "<AREA: summary>" --body "<what and why>"
```

- PR body ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)` when Claude wrote it.
- Review the diff on GitHub. Check the Vercel preview deployment for both hosts
  (mohanlalsonsgroup.com routes and khadane.com routes) before merging.

## Step 6 — Merge

Preferred: merge the PR on GitHub (merge commit, not squash, so branch history is kept).

Fallback, done by Ankit from the main worktree, never by Claude from this one:

```bash
cd /Users/ankit_gupta/WebstormProjects/mlfinal.com
git pull origin main
git merge khadane-dev
git push origin main
```

## Step 7 — Bring main back into this worktree

```bash
git fetch origin
git merge origin/main
```

- After this, `git log --oneline HEAD..origin/main` must be empty again.
- `khadane-dev` keeps living. Do not delete it after a merge.

## Step 8 — Confirm deployment

- Check the Vercel production deployment finished.
- Spot-check one KHADANE page and one MLS page on the live hosts.
- See `DEPLOYMENT.md` for host and environment details.

## Quick reference — the whole thing in order

```bash
git status                                   # 1 clean?
npx tsc --noEmit && npm run build            # 2 builds?
git fetch origin && git merge origin/main    # 3 synced?
git push -u origin khadane-dev               # 4 pushed
gh pr create --base main --head khadane-dev  # 5 PR
# merge on GitHub                            # 6 merged
git fetch origin && git merge origin/main    # 7 back in sync
```

## Rules

- Do not push or merge unless Ankit asks for it in that session.
- Do not use bare `git stash` / `git stash pop`; the stash is shared across worktrees.
- Do not rewrite history on `main`.
- Do not delete `khadane-dev` after merging.
