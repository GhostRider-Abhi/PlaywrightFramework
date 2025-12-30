FROM mcr.microsoft.com/playwright:v1.53.1-jammy

WORKDIR /workspace

# Copy package metadata first for better docker cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy rest of the repository
COPY . .

# Ensure local node_modules binaries are on PATH
ENV PATH=/workspace/node_modules/.bin:$PATH

# Default: run only the ecommerce tests. Can be overridden at `docker run` time.
CMD ["npx", "playwright", "test", "tests/e2e/ecommerce", "--reporter=dot"]
