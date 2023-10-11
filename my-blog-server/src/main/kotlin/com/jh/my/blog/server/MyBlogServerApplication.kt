package com.jh.my.blog.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories
class MyBlogServerApplication

fun main(args: Array<String>) {
    runApplication<MyBlogServerApplication>(*args)
}
