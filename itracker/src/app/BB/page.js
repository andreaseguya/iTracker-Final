"use client"
import React, { useState } from 'react'
// import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'

export default function Scheduler() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    // const [appointments, setAppointments] = useState([]
    function formatEvents() {
        return currentEvents.map(appointment => {
            const { title, end, start } = appointment

            let startTime = new Date(start)
            let endTime = new Date(end)

            return {
                title,
                start: startTime,
                end: endTime,
                extendedProps: { ...appointment }
            }
        })
    }
    function handleDateClick(e) {
        // alert(e.dateStr)

    }
    return (
        <section class="w-[400px]">

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                droppable={true}
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
                dateClick={handleDateClick}
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
//8/27
            handleEventClick= ({event}) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    this.props.openAppointment(event.extendedProps)
}

handleEventDrop = (info) => {
        if(window.confirm("Are you sure you want to change the event date?")){
            console.log('change confirmed')

            // updateAppointment is another custom method
            this.props.updateAppointment({...info.event.extendedProps, start: info.event.start, end: info.event.end})

        } else {
            console.log('change aborted')
        }
   }
            */
            />

        </section>
    )
}

