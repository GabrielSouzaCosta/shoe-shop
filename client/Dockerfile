FROM node:16-alpine AS builder

WORKDIR /client
COPY . ./

RUN yarn

ENV PATH="./node_modules/ .bin:$PATH"

RUN yarn run build

FROM nginx:alpine

RUN apk --no-cache add curl

RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

COPY --from=builder /client/dist /usr/share/nginx/html 

# fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]