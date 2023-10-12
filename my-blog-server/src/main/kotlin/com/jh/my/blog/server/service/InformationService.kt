package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.InformationDto
import com.jh.my.blog.server.repository.InformationRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class InformationService(
    private val informationRepository: InformationRepository,
) {
    @Transactional(readOnly = true)
    fun getInformation(): InformationDto {
        val information = informationRepository.getByName("송정현") ?: throw Exception()
        return InformationDto.toDto(information)
    }
}
