package com.jh.my.blog.server.controller

import com.jh.my.blog.server.dto.BoardResponse
import com.jh.my.blog.server.dto.PostBoardRequest
import com.jh.my.blog.server.jwt.JwtTokenProvider
import com.jh.my.blog.server.service.BoardService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

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

    @PostMapping("")
    fun postBoard(@RequestBody request: PostBoardRequest, @RequestHeader(name = "Authorization") token: String): ResponseEntity<Long> {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        val result = boardService.postBoard(request, userId)
        return ResponseEntity.created(URI.create("/boards/${result.id}")).body(result.id)
    }

    @DeleteMapping("/{boardId}")
    fun deleteBoard(@PathVariable(name = "boardId") boardId: Long, @RequestHeader(name = "Authorization") token: String): Boolean {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return boardService.deleteBoard(boardId, userId)
    }

    @PatchMapping("/{boardId}")
    fun patchBoard(@PathVariable(name = "boardId") boardId: Long, @RequestHeader(name = "Authorization") token: String, @RequestBody request: PostBoardRequest): Boolean {
        val userId = jwtTokenProvider.getUserPk(token) ?: throw Exception()
        return boardService.patchBoard(boardId, userId, request)
    }
}
