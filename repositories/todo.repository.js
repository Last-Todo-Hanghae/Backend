const { Todo } = require("../models"); // 모델 가져오기

class TodoRepository {
	// todo 항목 생성
	postTodo = async ( userId, todoContent, todoPriority ) => {
		const todo = await Todo.create({
			userId,
			todoContent,
			todoIsDone: false,
			todoPriority,
		});
		return todo;
	};

	// todo 항목 조회
	getTodo = async (todoId) => {
		const todo = await Todo.findOne({ where: { todoId } });
		return todo;
	};

	// todo 중요도 수정
	putPriorityTodo = async (todoId, todoPriority) => {
		const todo = await Todo.update({ todoPriority }, { where: { todoId } });
		return todo;
	};

	// todo 내용 수정
	putContentTodo = async (todoId, todoContent) => {
		const todo = await Todo.update({ todoContent }, { where: { todoId } });
		return todo;
	};

	// todo 완료 여부 수정
	putIsDoneTodo = async (todoId, todoIsDone) => {
		const todo = await Todo.update( { todoIsDone }, { where: { todoId } });
		return todo;
	};

	// todo 삭제
	deleteTodo = async (todoId) => {
		await Todo.destroy({ where: { todoId } });
		return true;
	};


}

module.exports = TodoRepository;