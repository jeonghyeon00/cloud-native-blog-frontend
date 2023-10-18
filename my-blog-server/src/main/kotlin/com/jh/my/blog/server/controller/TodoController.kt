package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.TodoDto
import com.jh.my.blog.server.entity.Todo
import com.jh.my.blog.server.jwt.JwtTokenProvider
import com.jh.my.blog.server.service.TodoService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/todo")
class TodoController(
    private val todoService: TodoService,
    private val jwtTokenProvider: JwtTokenProvider,
) {
    @GetMapping("")
    fun getAllByUser(@RequestHeader(name = "Authorization") token: String): List<Todo> {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return todoService.getAllByUser(userId)
    }

    @PostMapping("")
    fun postTodo(@RequestHeader(name = "Authorization") token: String, @RequestBody todoDto: TodoDto): Todo {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return todoService.postTodo(userId, todoDto)
    }
}
