"use client"
import Link from "next/link"
import Search from "../Search/page"
import Tabs from "semantic-ui-react"

export default function Check() {
    return (
        <section>
            <Tabs class="ui top attached tabular menu">
                <a class="item active" data-tab="first">First</a>
                <a class="item" data-tab="second">Second</a>
                <a class="item" data-tab="third">Third</a>
            </Tabs>
            <div class="ui bottom attached tab segment active" data-tab="first">
                First
            </div>
            <div class="ui bottom attached tab segment" data-tab="second">
                Second
            </div>
            <div class="ui bottom attached tab segment" data-tab="third">
                Third
            </div>
        </section>
    )
}