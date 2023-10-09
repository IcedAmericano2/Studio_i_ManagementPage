FROM node:14 as builder

# set working directory
WORKDIR / app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx
# 80포트 오픈하고 nginx 실행
EXPOSE 80
# nginx가 동작하기 위해 필요한 파일들을 시스템으로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Ubuntu에서 Nginx를 포어그라운드에서 실행할 경우 아래와 같이 실행
CMD ["nginx", "-g", "daemon off;"]