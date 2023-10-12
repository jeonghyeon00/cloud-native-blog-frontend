package com.jh.my.blog.server.controller

import com.jh.my.blog.server.entity.Information
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
@RequestMapping("/api")
class InformationController {

    @Value("\${server_number}")
    lateinit var serverNumber: String

    @GetMapping("/server")
    fun test(): Map<String, String> {
        return mapOf("serverNumber" to serverNumber)
    }

    @GetMapping("/information")
    fun getInformation(): Information {
        return Information("정현", "https://github.com/jeonghyeon00", "010", LocalDate.now())
    }
}
