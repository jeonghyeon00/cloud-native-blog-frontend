package com.jh.my.blog.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class InformationController {
    @GetMapping("/")
    fun test(): String {
        return "test"
    }
}
