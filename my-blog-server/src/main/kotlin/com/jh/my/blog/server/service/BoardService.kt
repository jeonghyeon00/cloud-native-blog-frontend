package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.BoardResponse
import com.jh.my.blog.server.repository.BoardRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BoardService(
    private val boardRepository: BoardRepository,
) {
    fun getAllBoards(): List<BoardResponse> {
        return boardRepository.findAll().map {
            BoardResponse.toBoardResponse(it)
        }.sortedByDescending { it.id }
    }

    fun getBoard(boardId: Long): BoardResponse {
        return BoardResponse.toBoardResponse(boardRepository.getReferenceById(boardId))
    }

    @Transactional
    fun deleteBoard(boardId: Long, userId: String): Boolean {
        val board = boardRepository.getReferenceById(boardId)
        return if (board.user.userId == userId) {
            boardRepository.delete(board)
            true
        } else {
            false
        }
    }
}
