FROM node:18.18.0-alpine as build
WORKDIR /client    
# WORKDIR /usr/src/app
COPY package*.json .
# RUN apk add --update python3 make g++\
#    && rm -rf /var/cache/apk/*
RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
RUN yarn install   
COPY . .
# EXPOSE 5173
# RUN yarn run build

# ENV VITE_SERVER_URL=http://localhost:5000

# FROM nginx:1.21.0-alpine
# COPY --from=build /client/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # # EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:20-alpine as build

# WORKDIR /client 

# COPY package.json .

# RUN npm install  

# COPY . .

# # EXPOSE 5173

# CMD ["npm", "run", "dev"]








