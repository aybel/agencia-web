# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

# ---------- Base: dependencias ----------
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- Desarrollo (Vite con hot reload) ----------
FROM node:${NODE_VERSION}-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ---------- Build de producción ----------
FROM deps AS build
WORKDIR /app
# Las variables VITE_* se incrustan en el bundle durante el build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
COPY . .
RUN npm run build

# ---------- Producción (Nginx sirviendo estáticos) ----------
FROM nginx:stable-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
