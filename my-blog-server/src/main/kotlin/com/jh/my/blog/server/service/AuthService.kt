package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.SignInDto
import com.jh.my.blog.server.dto.SignUpDto
import com.jh.my.blog.server.entity.User
import com.jh.my.blog.server.jwt.JwtTokenProvider
import com.jh.my.blog.server.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val jwtTokenProvider: JwtTokenProvider,
    private val passwordEncoder: PasswordEncoder,
    private val userRepository: UserRepository,
) {
    @Transactional
    fun signUp(signUpDto: SignUpDto): Boolean {
        with(signUpDto) {
            if (userRepository.existsById(userId)) {
                return false
            }
            userRepository.save(User(userId, passwordEncoder.encode(password), name))
            return true
        }
    }

    @Transactional
    fun signIn(signInto: SignInDto): String? {
        with(signInto) {
            val user = userRepository.findByIdOrNull(userId)
            if (user != null) {
                if (passwordEncoder.matches(password, user.password)) {
                    return jwtTokenProvider.createToken(user.userId)
                }
            }
            return null
        }
    }
}
