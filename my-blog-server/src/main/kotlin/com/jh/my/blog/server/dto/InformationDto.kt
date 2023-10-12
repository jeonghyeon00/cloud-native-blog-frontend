package com.jh.my.blog.server.dto

import com.jh.my.blog.server.entity.Information
import java.time.format.DateTimeFormatter

class InformationDto(
    val name: String,
    val githubUrl: String,
    val phoneNumber: String,
    val birthdate: String,
    val description: String,
) {
    companion object {
        fun toDto(information: Information): InformationDto {
            with(information) {
                return InformationDto(
                    name,
                    githubUrl,
                    phoneNumber,
                    birthDate.format(DateTimeFormatter.ofPattern("YYYY-MM-DD")),
                    description,
                )
            }
        }
    }
}
