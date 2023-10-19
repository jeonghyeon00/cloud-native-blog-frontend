package com.jh.my.blog.server.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.jh.my.blog.server.dto.StockResponse
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.net.URI
import java.net.URLEncoder

@Service
class StockService(
    private val restTemplate: RestTemplate,
) {

    fun getStocks(text: String?): StockResponse {
        var url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo"
        url += "?serviceKey=%2BcSAtRjQ2zjdyRRv1SSrFgvSW3mAhGd4wMQptV6tUYckxgGa7JyDNNpiggGp7liQL3yjfQ1m03fcvJc%2Fw9XBLA%3D%3D&numOfRows=10&pageNo=1&resultType=json"
        if (!text.isNullOrEmpty()) {
            url += "&likeItmsNm="
            url += URLEncoder.encode(text)
        }
        val restTemplate = RestTemplate()
        val entity: HttpEntity<String> = HttpEntity(HttpHeaders())

        val resultMap: ResponseEntity<String> = restTemplate.exchange(
            URI.create(url),
            HttpMethod.GET,
            entity,
            String::class.java,
        )
        val objectMapper = ObjectMapper()
        return objectMapper.readValue(resultMap.body, StockResponse::class.java)
    }
}
