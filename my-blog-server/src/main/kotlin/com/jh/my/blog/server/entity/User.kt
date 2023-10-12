package com.jh.my.blog.server.entity

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "users")
class User(
    @Id
    val userId: String,
    val password: String,
    val name: String,
)
