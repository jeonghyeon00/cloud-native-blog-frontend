package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.TodoRequest
import com.jh.my.blog.server.entity.Todo
import com.jh.my.blog.server.repository.TodoRepository
import com.jh.my.blog.server.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class TodoService(
    private val todoRepository: TodoRepository,
    private val userRepository: UserRepository,
) {
    @Transactional
    fun getAllByUser(userId: String): List<Todo> {
        return todoRepository.findAllByUser(userRepository.getReferenceById(userId)).sortedByDescending { it.id }
    }

    @Transactional
    fun postTodo(userId: String, todoRequest: TodoRequest): Todo {
        val user = userRepository.getReferenceById(userId)
        return todoRepository.save(Todo(todoRequest.description, false, user))
    }

    @Transactional
    fun patchTodo(userId: String, todoId: Long): Boolean {
        val todo = todoRepository.findByIdOrNull(todoId) ?: throw Exception()
        return if (userId == todo.user.userId) {
            todo.isChecked = !todo.isChecked
            true
        } else {
            false
        }
    }

    @Transactional
    fun deleteTodo(userId: String, todoId: Long): Boolean {
        val todo = todoRepository.findByIdOrNull(todoId) ?: throw Exception()
        return if (userId == todo.user.userId) {
            todoRepository.delete(todo)
            true
        } else {
            false
        }
    }
}
