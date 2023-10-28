package com.jh.my.blog.server.entity

import com.jh.my.blog.server.constant.FoodCategory
import jakarta.persistence.*

@Entity
class Restaurant(
    val name: String,
    val lat: Double,
    val lng: Double,
    @Enumerated(value = EnumType.STRING)
    val category: FoodCategory,
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
