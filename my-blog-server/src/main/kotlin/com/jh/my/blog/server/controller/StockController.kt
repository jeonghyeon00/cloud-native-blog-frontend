package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.StockResponse
import com.jh.my.blog.server.service.StockService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/stocks")
class StockController(
    private val stockService: StockService,
) {
    @GetMapping("")
    fun getStocks(@RequestParam(name = "text")text: String): StockResponse {
        return stockService.getStocks(text)
    }
}
