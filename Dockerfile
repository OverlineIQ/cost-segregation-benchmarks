FROM node:22-alpine
WORKDIR /app
COPY package.json SKILL.md README.md CITATION.cff LICENSE glama.json ./
COPY data ./data
COPY mcp-server ./mcp-server
RUN node mcp-server/index.mjs --selftest
ENTRYPOINT ["node", "mcp-server/index.mjs"]
