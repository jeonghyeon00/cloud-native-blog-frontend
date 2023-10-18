package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.TodoRequest
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
    fun postTodo(@RequestHeader(name = "Authorization") token: String, @RequestBody todoRequest: TodoRequest): Todo {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return todoService.postTodo(userId, todoRequest)
    }

    @PatchMapping("/{todoId}")
    fun patchTodo(@RequestHeader(name = "Authorization") token: String, @PathVariable(name = "todoId") todoId: Long): Boolean {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return todoService.patchTodo(userId, todoId)
    }

    @DeleteMapping("/{todoId}")
    fun deleteTodo(@RequestHeader(name = "Authorization") token: String, @PathVariable(name = "todoId") todoId: Long): Boolean {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return todoService.deleteTodo(userId, todoId)
    }
}
