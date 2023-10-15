package com.jh.my.blog.server.jwt

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*

@Component
class JwtTokenProvider() {
    companion object {
        private const val accessTokenExpireTime = 60 * 60 * 1000L * 24 * 30
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder? {
        return BCryptPasswordEncoder()
    }

    @Value("\${JWT-SECRET}")
    private lateinit var secretKey: String
    lateinit var key: Key

    @PostConstruct
    protected fun init() {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey))
    }

    fun createToken(userId: String): String {
        val accessTokenRefreshTime = accessTokenExpireTime
        val now = Date()
        return Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setSubject(userId)
            .setIssuedAt(now)
            .setExpiration(Date(now.time + accessTokenRefreshTime))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun getUserPk(token: String): String? {
        if (!validateToken(token)) {
            return null
        }
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).body.subject
    }

    fun validateToken(token: String): Boolean {
        return try {
            val claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            !claims.body.expiration.before(Date())
        } catch (e: Exception) {
            false
        }
    }
}
