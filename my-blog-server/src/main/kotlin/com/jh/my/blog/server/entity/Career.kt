package com.jh.my.blog.server.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Career(
    val companyName: String,
    val job: String,
    val workDate: String,
    val url: String?,
    val pbg: String,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
