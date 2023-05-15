# Backend
아람님, 동선님, 상우님
# Extentsion
prettier
MySql
gitignore
# 프로젝트 초기 구성
```
npm init
npm install express jsonwebtoken cookie-parser sequelize mysql2 dotenv
npm install -D sequelize-cli nodemon
```
# DB 구성
**sequelize 초기 구성**
```
npx sequelize init
```
**모델 구성**
```
User
npx sequelize model:generate --name User --attributes userName:string,userPassword:string

UserInfo
npx sequelize model:generate --name UserInfo --attributes userImage:string

Todo
npx sequelize model:generate --name Todo --attributes todoContent:string,todoStatus:boolean,todoPriority:string

Like
npx sequelize model:generate --name Like --attributes sourceUserId:bigint,targetUserId:bigint
```
**dotenv 구성**
config/config.json -> config.js로 수정 및 변경
model/index.js 파일 수정
참고링크 : https://velog.io/@hyunju-song/sequelize%EB%A1%9C-DB%EC%85%8B%ED%8C%85%ED%95%A0-%EB%95%8C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%ED%8C%8C%EC%9D%BC-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
.env 파일생성
```
MYSQL_USERNAME= (db 사용자이름)
MYSQL_PASSWORD= (비번)
MYSQL_DATABASE= (사용하고자 하는 데이터베이스 이름)
MYSQL_HOST=(database endpoint 주소)
```
**config.json 파일을 통한 DB 생성**
```
npx sequelize db:create
```
**Migrations에 정의된 테이블을 실제 DB에 생성**
```
npx sequelize db:migrate
```