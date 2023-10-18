package com.jh.my.blog.server.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class Todo(
    val description: String,
    var isChecked: Boolean,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User,

    val createdAt: LocalDateTime = LocalDateTime.now(),
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
