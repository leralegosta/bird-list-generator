# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG REACT_APP_EBIRD_API_KEY
ENV REACT_APP_EBIRD_API_KEY=$REACT_APP_EBIRD_API_KEY

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
