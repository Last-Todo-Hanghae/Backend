const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// yourtodo controller
const yourtodoController = require("../controllers/yourtodo.controller");
router.get("/", authMiddleware, yourtodoController.yourtodoGet);
router.get("/:userId", authMiddleware, yourtodoController.yourtodoGetDetail);
router.put("/:userId/like", authMiddleware, yourtodoController.yourtodoPutLike);

module.exports = {
  router
};

/**
 * @swagger
 * paths:
 *  /api/yourtodo:
 *    get:
 *      summary: "yourtodo 리스트 조회"
 *      description: "GET 메소드, yourtodo 리스트 조회 API"
 *      tags: [YOURTODO]
 *      responses:
 *        "200":
 *          description: yourtodo 리스트 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {
 *                    "yourtodo": [
 *                      {
 *                        "userName": "testuser1",
 *                        "userId": 1,
 *                        "UserInfo": {
 *                          "userImage": null
 *                        },
 *                        "Likes": [
 *                          {
 *                            "isLike": false,
 *                            "updatedAt": "2023-05-21T05:21:08.000Z"
 *                          }
 *                        ],
 *                        "Todos": [
 *                          {
 *                            "todoId": 7,
 *                            "todoContent": "물 1L 마시기",
 *                            "todoIsDone": false,
 *                            "updatedAt": "2023-05-21T07:26:34.000Z"
 *                          },
 *                          {
 *                            "todoId": 4,
 *                            "todoContent": "물 1L 마시기",
 *                            "todoIsDone": false,
 *                            "updatedAt": "2023-05-20T07:11:46.000Z"
 *                          },
 *                          {
 *                            "todoId": 3,
 *                            "todoContent": "물 1L 마시기",
 *                            "todoIsDone": false,
 *                            "updatedAt": "2023-05-20T05:13:55.000Z"
 *                          }
 *                        ]
 *                      }, ...
 *                    ]
 *                  }
 *        "402":
 *          description: 토큰 유효성 검사 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { 
 *                    "message": "토큰의 userId 정보가 유효하지 않습니다."
 *                  }
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "yourtodo 리스트 조회에 실패했습니다." }
 *  /api/yourtodo/:userid:
 *    get:
 *      summary: "yourtodo 상세 조회"
 *      description: "GET 메소드, yourtodo 상세 조회 API"
 *      tags: [YOURTODO]
 *      responses:
 *        "200":
 *          description: yourtodo 상세 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {
 *                    "userName": "testuser1",
 *                    "userImage": null,
 *                    "isLike": false,
 *                    "mytodo": [
 *                      {
 *                        "todoId": 7,
 *                        "todoContent": "물 1L 마시기",
 *                        "todoIsDone": false,
 *                        "todoPriority": "today"
 *                      },
 *                      {
 *                        "todoId": 4,
 *                        "todoContent": "물 1L 마시기",
 *                        "todoIsDone": false,
 *                        "todoPriority": "today"
 *                      }, ...
 *                    ]
 *                  }
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "입력값이 올바르지 않습니다." }
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "yourtodo 상세 유저 조회에 실패했습니다." }
 *        "404":
 *          description: 리소스를 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 유저를 찾을 수 없습니다." }
 *  /api/yourtodo/:userid/like:
 *    put:
 *      summary: "좋아요 추가/삭제"
 *      description: "PUT 메소드, 좋아요 추가/삭제 API"
 *      tags: [YOURTODO]
 *      responses:
 *        "201":
 *          description: 좋아요 추가/삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "403":
 *          description: 기타 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "좋아요 추가/삭제에 실패했습니다." }
 *        "404":
 *          description: 해당 유저를 찾을 수 없음
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 유저를 찾을 수 없습니다." }
 */
