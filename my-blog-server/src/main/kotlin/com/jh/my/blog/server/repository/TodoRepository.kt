package com.jh.my.blog.server.repository

import com.jh.my.blog.server.entity.Todo
import com.jh.my.blog.server.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoRepository : JpaRepository<Todo, Long> {
    fun findAllByUser(user: User): List<Todo>
}
