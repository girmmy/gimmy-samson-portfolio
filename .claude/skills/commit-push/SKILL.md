---
name: commit-push
description: Guided commit + push flow with a built-in confirmation gate before git push. Use when the user wants to commit and push changes to GitHub.
disable-model-invocation: true
---

1. Run `git status` and `git diff` to review staged and unstaged changes.
2. Draft a concise commit message based on the changes. No `Co-Authored-By` tags.
3. Show the user the list of files to be staged and the proposed commit message. Ask for approval before committing.
4. On approval: stage the relevant files and commit.
5. After committing, **explicitly ask**: "Ready to push to origin/main?" — do not push until the user confirms with a clear yes.
6. On confirmation: `git push origin main`.
