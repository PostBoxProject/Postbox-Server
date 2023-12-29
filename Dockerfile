# 이미지의 기반이 될 이미지를 선택합니다.
FROM node:16-alpine as builder

# 작업 디렉터리를 설정합니다.
WORKDIR /app

# 소스 코드를 복사합니다.
COPY . .

# TypeScript 소스 코드를 빌드합니다.
RUN npm install
RUN npm run build

# 런타임 이미지를 생성합니다.
FROM node:16-alpine

# 작업 디렉터리를 설정합니다.
WORKDIR /app

# 빌드된 JavaScript 코드와 노드 모듈만을 복사합니다.
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# 애플리케이션을 실행합니다.
CMD ["node", "dist/main"]