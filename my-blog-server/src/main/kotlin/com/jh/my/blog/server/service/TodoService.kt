package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.TodoDto
import com.jh.my.blog.server.entity.Todo
import com.jh.my.blog.server.repository.TodoRepository
import com.jh.my.blog.server.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class TodoService(
    private val todoRepository: TodoRepository,
    private val userRepository: UserRepository,
) {
    @Transactional
    fun getAllByUser(userId: String): List<Todo> {
        return todoRepository.findAllByUser(userRepository.getReferenceById(userId))
    }

    @Transactional
    fun postTodo(userId: String, todoDto: TodoDto): Todo {
        val user = userRepository.getReferenceById(userId)
        return todoRepository.save(Todo(todoDto.description, false, user))
    }
}
