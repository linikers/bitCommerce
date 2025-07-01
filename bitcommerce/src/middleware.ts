// import { response } from "express";
import { NextResponse } from "next/server";
// import type {NextRequest } from "next/server";

export function middleware() {

    const res = NextResponse.next()

    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
            
    return res
}
export const config = {
    matcher: '/api/:path*',
}