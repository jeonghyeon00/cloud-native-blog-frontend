package com.jh.my.blog.server.service

import com.jh.my.blog.server.dto.BoardResponse
import com.jh.my.blog.server.dto.PostBoardRequest
import com.jh.my.blog.server.entity.Board
import com.jh.my.blog.server.repository.BoardRepository
import com.jh.my.blog.server.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class BoardService(
    private val boardRepository: BoardRepository,
    private val userRepository: UserRepository,
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

    @Transactional
    fun postBoard(request: PostBoardRequest, userId: String): Board {
        with(request) {
            return boardRepository.save(Board(title, content, LocalDateTime.now(), userRepository.getReferenceById(userId)))
        }
    }

    @Transactional
    fun patchBoard(boardId: Long, userId: String, request: PostBoardRequest): Boolean {
        val board = boardRepository.getReferenceById(boardId)
        return if (board.user.userId == userId) {
            board.title = request.title
            board.content = request.content
            true
        } else {
            false
        }
    }
}
