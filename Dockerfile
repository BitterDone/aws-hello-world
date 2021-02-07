# https://mherman.org/blog/dockerizing-a-react-app/
# https://medium.com/@daniel.revie1/deploying-react-docker-image-to-aws-fargate-bf551128cb88
# build env
FROM node:13.12.0-alpine as builder

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . /usr/src/app

# start app
# CMD ["npm", "start"]
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 

# docker run -it --rm
# -p 3001:3000
# -v ${PWD}:/app -v /app/node_modules
# -e CHOKIDAR_USEPOLLING=true
# aws-deploy-test:dev

# docker run
# -p 3001:3000
# aws-deploy-test:dev
