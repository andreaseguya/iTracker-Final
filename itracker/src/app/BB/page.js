"use client"
import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
export default function Scheduler() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    function formatEvents() {
        return (
            <div></div>
        )
    }
    return (
        <section class="w-[400px]">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next',
                    // center: 'today',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                // 8/26
                // eventDrop={this.handleEventDrop}
                // eventClick={this.handleEventClick}
                events={formatEvents()}

            //previous paste
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // select={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />

        </section>
    )
}