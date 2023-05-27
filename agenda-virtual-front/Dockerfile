FROM node:18.16

# pasta para aonde vai o build
WORKDIR /app

COPY . .
RUN npm i
# RUN npm run build

RUN rm -rf /var/www/html
RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html

WORKDIR /

RUN rm -rf /app