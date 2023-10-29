package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.InformationDto
import com.jh.my.blog.server.dto.RestaurantDto
import com.jh.my.blog.server.entity.Career
import com.jh.my.blog.server.jwt.JwtTokenProvider
import com.jh.my.blog.server.service.InformationService
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class InformationController(
    private val informationService: InformationService,
    private val jwtTokenProvider: JwtTokenProvider,
) {

    @Value("\${server_number}")
    lateinit var serverNumber: String

    @GetMapping("/server")
    fun test(): Map<String, String> {
        return mapOf("serverNumber" to serverNumber)
    }

    @GetMapping("/information")
    fun getInformation(): InformationDto {
        return informationService.getInformation()
    }

    @GetMapping("/name")
    fun getName(@RequestHeader(name = "Authorization") token: String): Map<String, Any?> {
        val userId = jwtTokenProvider.getUserPk(token) ?: return mapOf("success" to false)
        return mapOf("name" to informationService.getName(userId))
    }

    @GetMapping("/careers")
    fun getCareers(): List<Career> {
        return informationService.getCareers()
    }

    @GetMapping("/restaurants")
    fun getRestaurants(): List<RestaurantDto> {
        return informationService.getRestaurants().map {
            RestaurantDto(it.name, it.lat, it.lng, it.category.krString, it.id)
        }
    }
}
