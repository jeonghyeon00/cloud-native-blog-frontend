package com.jh.my.blog.server.dto

import com.jh.my.blog.server.entity.Board
import java.time.format.DateTimeFormatter

class BoardResponse(
    val id: Long,
    val title: String,
    val content: String,
    val createdAt: String,
    val createdBy: String,
) {
    companion object {
        fun toBoardResponse(board: Board): BoardResponse {
            with(board) {
                return BoardResponse(
                    id,
                    title,
                    content,
                    createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd a hh:mm")),
                    user.name,
                )
            }
        }
    }
}
