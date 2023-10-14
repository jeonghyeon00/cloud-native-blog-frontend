package com.jh.my.blog.server.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class Board(
    val title: String,
    val content: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User,
) {
    @Id
    val id: Long = 0
}
