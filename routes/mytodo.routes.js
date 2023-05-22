const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// mytodo controller
const mytodoController = require("../controllers/mytodo.controller");

/**
 * @swagger
 * paths:
 *  /api/mytodo:
 *    get:
 *      summary: "mytodo 리스트 조회"
 *      description: "GET 메소드, mytodo 리스트 조회 API"
 *      tags: [MYTODO]
 *      responses:
 *        "200":
 *          description: mytodo 리스트 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {
 *                    "userName": "testuser1",
 *                    "userImage": null,
 *                    "mytodo": [
 *                      {
 *                        "todoId": 2,
 *                        "todoContent": "물 1L 마시기",
 *                        "todoIsDone": false,
 *                        "todoPriority": "today",
 *                        "updatedAt": "2023-05-20T05:13:51.000Z"
 *                      },
 *                      {
 *                        "todoId": 1,
 *                        "todoContent": "물 1L 마시기",
 *                        "todoIsDone": false,
 *                        "todoPriority": "today",
 *                        "updatedAt": "2023-05-20T05:13:11.000Z"
 *                      }
 *                    ]
 *                  }
 *        "402":
 *          description: 토큰 정보에 있는 userId 유효성 검사 실패
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
 *                  { "message": "mytodo 리스트 조회에 실패했습니다." }
 *    post:
 *      summary: "mytodo 항목 추가"
 *      description: "POST 메소드, mytodo 항목 추가 API"
 *      tags: [MYTODO]
 *      responses:
 *        "201":
 *          description: mytodo 항목 추가 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {
 *                    "userName": "testuser1",
 *                    "todoId": 4,
 *                    "todoContent": "물 1L 마시기",
 *                    "todoIsDone": false,
 *                    "todoPriority": "today"
 *                  }
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
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
 *                  { "message": "mytodo 항목 추가에 실패했습니다." }
 *  /api/mytodo/:todoid/priority:
 *    put:
 *      summary: "mytodo 중요도 수정"
 *      description: "PUT 메소드, mytodo 중요도 수정 API"
 *      tags: [MYTODO]
 *      responses:
 *        "201":
 *          description: mytodo 중요도 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
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
 *                  { "message": "mytodo 중요도 변경에 실패했습니다." }
 *        "404":
 *          description: mytodo 항목을 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 mytodo 항목을 찾을 수 없습니다." }
 *  /api/mytodo/:todoid/content:
 *    put:
 *      summary: "mytodo 내용 수정"
 *      description: "PUT 메소드, mytodo 내용 수정 API"
 *      tags: [MYTODO]
 *      responses:
 *        "201":
 *          description: mytodo 내용 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
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
 *                  { "message": "mytodo 내용 변경에 실패했습니다." }
 *        "404":
 *          description: mytodo 항목을 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 mytodo 항목을 찾을 수 없습니다." }
 *  /api/mytodo/:todoid/isdone:
 *    put:
 *      summary: "mytodo 완료여부 수정"
 *      description: "PUT 메소드, mytodo 완료여부 수정 API"
 *      tags: [MYTODO]
 *      responses:
 *        "201":
 *          description: mytodo 완료여부 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {}
 *        "402":
 *          description: 입력 데이터 유효성 검증 실패 (공백 데이터 입력)
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
 *                  { "message": "mytodo 완료여부 수정에 실패했습니다." }
 *        "404":
 *          description: mytodo 항목을 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 mytodo 항목을 찾을 수 없습니다." }
 *  /api/mytodo/:todoid:
 *    delete:
 *      summary: "mytodo 항목 삭제"
 *      description: "DELETE 메소드, mytodo 항목 삭제 API"
 *      tags: [MYTODO]
 *      responses:
 *        "201":
 *          description: mytodo 항목 삭제 성공
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
 *                  { "message": "mytodo 항목 삭제에 실패했습니다." }
 *        "404":
 *          description: mytodo 항목을 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  { "message": "해당 mytodo 항목을 찾을 수 없습니다." }
 */
router.post("/", authMiddleware, mytodoController.mytodoPost);
router.get("/", authMiddleware, mytodoController.mytodoGet);
router.put("/:todoId/priority", authMiddleware, mytodoController.mytodoPutPriority);
router.put("/:todoId/content", authMiddleware, mytodoController.mytodoPutContent);
router.put("/:todoId/isdone", authMiddleware, mytodoController.mytodoPutIsDone);
router.delete("/:todoId", authMiddleware, mytodoController.mytodoDelete);

module.exports = {
  router
};
