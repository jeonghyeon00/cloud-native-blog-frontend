package com.jh.my.blog.server.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class Board(
    var title: String,
    var content: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
