package com.jh.my.blog.server.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDate

@Entity
class Information(
    @Column(unique = true)
    val name: String,
    val githubUrl: String,
    val phoneNumber: String,
    val birthDate: LocalDate,
    val description: String,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
