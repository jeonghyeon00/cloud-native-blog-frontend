package com.jh.my.blog.server.repository

import com.jh.my.blog.server.entity.Career
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CareerRepository : JpaRepository<Career, Long>
