package com.jh.my.blog.server.global

import com.jh.my.blog.server.entity.*
import com.jh.my.blog.server.repository.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalDateTime

@Component
class InitDataInserter(
    private val jdbcTemplate: JdbcTemplate,
    private val informationRepository: InformationRepository,
    private val careerRepository: CareerRepository,
    private val boardRepository: BoardRepository,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val todoRepository: TodoRepository,
) {

    private val logger = LoggerFactory.getLogger(this::class.java)

    @Value("\${server_number}")
    lateinit var serverNumber: String

    @EventListener(ApplicationReadyEvent::class)
    @Transactional
    fun putDummyData() {
        if (serverNumber == "2") {
            return
        }
        if (checkInit()) {
            return
        }
        insertDummies()
        finishJob()
    }

    private fun insertDummies() {
        informationRepository.saveAndFlush(
            Information(
                "송정현",
                "https://github.com/jeonghyeon00",
                "010-2933-4709",
                LocalDate.of(2000, 1, 26),
                "안녕하세요 새로운 기술을 배우며 성장하고 싶은 백엔드 개발자 송정현이라고 합니다. Kotlin, Spring Boot, JPA을 주로 사용하고 있습니다.",
            ),
        )
        val user = userRepository.saveAndFlush(User("testid", passwordEncoder.encode("test"), "송정현"))
        careerRepository.saveAndFlush(Career("아온 스튜디오", "Backend Developer", "2022.03 ~ 2023.03", null, "primary.main"))
        careerRepository.saveAndFlush(
            Career(
                "온아웃",
                "Backend Developer",
                "2023.08 ~",
                "https://corp.on-out.com/",
                "secondary.main",
            ),
        )
        boardRepository.saveAndFlush(Board("테스트 게시물 1", "테스트 게시물 1의 내용입니다.", LocalDateTime.now(), user))
        boardRepository.saveAndFlush(Board("테스트 게시물 2", "테스트 게시물 2의 내용입니다.", LocalDateTime.now(), user))
        todoRepository.saveAndFlush(Todo("테스트1", false, user, LocalDateTime.now()))
        todoRepository.saveAndFlush(Todo("테스트2", true, user, LocalDateTime.now()))
    }

    private fun checkInit(): Boolean {
        var count: Long = 0
        jdbcTemplate.execute(
            " create table if not exists init_dummy (value bool)  ",
        )
        jdbcTemplate.query(" select count(*) as count from init_dummy ") { rs, rownum ->
            count = rs.getLong("count")
        }
        return if (count > 0) {
            logger.info("skipping dummy data insert")
            true
        } else {
            false
        }
    }

    private fun finishJob() {
        jdbcTemplate.execute(" insert into init_dummy values (true) ")
        logger.info("dummy data inserted")
    }
}
