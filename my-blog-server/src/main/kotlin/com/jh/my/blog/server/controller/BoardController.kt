package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.BoardResponse
import com.jh.my.blog.server.dto.PostBoardRequest
import com.jh.my.blog.server.jwt.JwtTokenProvider
import com.jh.my.blog.server.service.BoardService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/boards")
class BoardController(
    private val boardService: BoardService,
    private val jwtTokenProvider: JwtTokenProvider,
) {
    @GetMapping("")
    fun getAllBoards(): List<BoardResponse> {
        return boardService.getAllBoards()
    }

    @GetMapping("/{boardId}")
    fun getAllBoards(@PathVariable(name = "boardId") boardId: Long): BoardResponse {
        return boardService.getBoard(boardId)
    }

    @PostMapping("/")
    fun postBoard(@RequestBody request: PostBoardRequest) {
    }

    @DeleteMapping("/{boardId}")
    fun deleteBoard(@PathVariable(name = "boardId") boardId: Long, @RequestHeader(name = "Authorization") token: String): Boolean {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return boardService.deleteBoard(boardId, userId)
    }
}
