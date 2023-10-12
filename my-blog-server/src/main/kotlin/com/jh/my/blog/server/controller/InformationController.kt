package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.InformationDto
import com.jh.my.blog.server.service.InformationService
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class InformationController(
    private val informationService: InformationService,
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
}
