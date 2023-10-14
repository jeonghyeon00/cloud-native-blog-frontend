package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.InformationDto
import com.jh.my.blog.server.entity.Career
import com.jh.my.blog.server.repository.CareerRepository
import com.jh.my.blog.server.repository.InformationRepository
import com.jh.my.blog.server.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class InformationService(
    private val informationRepository: InformationRepository,
    private val userRepository: UserRepository,
    private val careerRepository: CareerRepository,
) {
    @Transactional(readOnly = true)
    fun getInformation(): InformationDto {
        val information = informationRepository.getByName("송정현") ?: throw Exception()
        return InformationDto.toDto(information)
    }

    @Transactional
    fun getName(userId: String): String? {
        return userRepository.findByIdOrNull(userId)?.name
    }

    fun getCareers(): MutableList<Career> {
        return careerRepository.findAll()
    }
}
