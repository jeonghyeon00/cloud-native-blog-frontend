package com.jh.my.blog.server.dto

data class StockResponse(
    val response: Response = Response(),
)

class Response(
    val body: Body = Body(),
    val header: Header = Header(),
)

class Body(
    val items: Items = Items(),
    val numOfRows: Int = 0,
    val pageNo: Int = 0,
    val totalCount: Int = 0,
)

class Header(
    val resultCode: String = "",
    val resultMsg: String = "",
)

class Items(
    val item: List<Item> = listOf(),
)

class Item(
    val basDt: String = "",
    val clpr: String = "",
    val fltRt: String = "",
    val hipr: String = "",
    val isinCd: String = "",
    val itmsNm: String = "",
    val lopr: String = "",
    val lstgStCnt: String = "",
    val mkp: String = "",
    val mrktCtg: String = "",
    val mrktTotAmt: String = "",
    val srtnCd: String = "",
    val trPrc: String = "",
    val trqu: String = "",
    val vs: String = "",
)
