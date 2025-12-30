# Playwright Dockerization & GitHub Actions Execution Guide

## 1. Objective

This document explains how to:

1. Create a Docker image from an existing Playwright automation repository
2. Publish the Docker image to Docker Hub
3. Execute Playwright tests from the published Docker image using GitHub Actions

This setup ensures **environment consistency**, **faster CI runs**, and **reliable browser execution**.

---

## 2. Prerequisites

- Working Playwright automation repository
- Docker installed locally
- Docker Hub account
- GitHub repository with GitHub Actions enabled

---

## 3. Why Use Playwright Official Docker Image

Playwright provides an **official Docker image** hosted on Microsoft Container Registry (MCR):

```
mcr.microsoft.com/playwright
```

### Benefits

- Pre-installed Chromium, Firefox, and WebKit
- All OS-level browser dependencies included
- Faster CI execution (no browser installation per run)
- Recommended and maintained by Playwright team

---

## 4. Dockerfile Creation

Add a `Dockerfile` at the root of your Playwright repository.

### Dockerfile

```dockerfile
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Ensure Playwright dependencies are installed
RUN npx playwright install --with-deps

# Default command (can be overridden in CI)
CMD ["npx", "playwright", "test"]
```

### Notes

- `npm ci` ensures deterministic builds
- Version is pinned to avoid CI instability
- `CMD` allows flexible execution in CI

---

## 5. Local Image Build & Validation

Before publishing, validate the image locally.

```bash
docker build -t playwright-tests .
```

Run tests using the image:

```bash
docker run --rm playwright-tests
```

Only proceed if tests pass successfully.

---

## 6. Publish Docker Image to Docker Hub

### Step 1: Login to Docker Hub

```bash
docker login
```

### Step 2: Tag the Image

```bash
docker tag playwright-tests <dockerhub-username>/playwright-tests:latest
```

### Step 3: Push the Image

```bash
docker push <dockerhub-username>/playwright-tests:latest
```

---

## 7. GitHub Actions Configuration

Create a GitHub Actions workflow file.

### File Path

```
.github/workflows/playwright.yml
```

### Workflow Configuration

```yaml
name: Playwright Tests (Docker)

on:
  push:
    branches: [main]
  pull_request:

jobs:
  playwright:
    runs-on: ubuntu-latest

    container:
      image: <dockerhub-username>/playwright-tests:latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run Playwright tests
        run: npx playwright test
```

### Key Points

- GitHub runner pulls the Docker image
- Tests execute inside the container
- No browser or Node setup required in CI

---

## 8. Running Tests with Tags (Optional)

If your framework supports tags (e.g., `@SMOKE`, `@P1`):

```yaml
- name: Run Playwright tests with tags
  run: npx playwright test --grep "$Tags"
  env:
    Tags: '@P1'
```

---

## 9. Uploading Playwright HTML Report (Optional

```yaml
- name: Upload Playwright Report
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
```

---

## 10. High-Level Architecture

```
Playwright Repo
│
├── Dockerfile
├── playwright.config.ts
├── tests/
├── package.json
└── .github/workflows/playwright.yml
        ↓
Docker Hub Image
        ↓
GitHub Actions pulls image
        ↓
Playwright tests execute inside container
```

---

## 11. Common Pitfalls

| Issue                         | Impact           |
| ----------------------------- | ---------------- |
| Using `node` base image       | Browsers missing |
| Using `latest` Playwright tag | CI instability   |
| Installing browsers in CI     | Slower execution |
| Headed mode in CI             | Failures         |

---

## 12. Recommended Enhancements

- Auto-build & push Docker image via GitHub Actions
- Versioned Docker images (`v1.0.0`, commit SHA)
- Parallel execution using Playwright sharding
- Browser matrix execution

---

## 13. Conclusion

This approach provides:

- Stable and reproducible test execution
- Faster CI pipelines
- Clean separation of test runtime and CI logic

This setup is recommended for **scalable Playwright automation frameworks** and aligns with **Test Architect best practices**.
