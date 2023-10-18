package com.jh.my.blog.server.dto

class TodoRequest(
    val isChecked: Boolean = false,
    val description: String,
)
