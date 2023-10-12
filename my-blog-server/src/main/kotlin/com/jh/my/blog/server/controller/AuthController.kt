package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.SignInDto
import com.jh.my.blog.server.dto.SignUpDto
import com.jh.my.blog.server.service.AuthService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/auth")
@RestController
class AuthController(
    private val authService: AuthService,
) {
    @PostMapping("/sign-up")
    fun signUp(@RequestBody signUpDto: SignUpDto): Map<String, Boolean> {
        return mapOf("success" to authService.signUp(signUpDto))
    }

    @PostMapping("/sign-in")
    fun signIn(@RequestBody signInDto: SignInDto): Map<String, String?> {
        return mapOf("token" to authService.signIn(signInDto))
    }
}
