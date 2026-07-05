FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000}
RUN echo ">>> NEXT_PUBLIC_API_URL usado no build: $NEXT_PUBLIC_API_URL"

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]