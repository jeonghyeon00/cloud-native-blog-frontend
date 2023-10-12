package com.jh.my.blog.server.global

import com.jh.my.blog.server.entity.Information
import com.jh.my.blog.server.repository.InformationRepository
import org.slf4j.LoggerFactory
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Component
class InitDataInserter(
    private val jdbcTemplate: JdbcTemplate,
    private val informationRepository: InformationRepository,
) {

    private val logger = LoggerFactory.getLogger(this::class.java)

    @EventListener(ApplicationReadyEvent::class)
    @Transactional
    fun putDummyData() {
        if (checkInit()) {
            return
        }
        insertDummies()
        finishJob()
    }

    private fun insertDummies() {
        informationRepository.save(
            Information(
                "송정현",
                "https://github.com/jeonghyeon00",
                "010-2933-4709",
                LocalDate.of(2000, 1, 26),
                "안녕하세요 새로운 기술을 배우며 성장하고 싶은 백엔드 개발자 송정현이라고 합니다.",
            ),
        )
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
