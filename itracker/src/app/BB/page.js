"use client"
import React, { useState, useRef } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import AddModal from './addLoanModal'
// function Scheduler() {
//     const [weekendsVisible, setWeekendsVisible] = useState(true)
//     const [currentEvents, setCurrentEvents] = useState([])
//     function rental() {
//         return (
//             <form>
//                 <label>Test</label>
//                 <input></input>
//             </form>
//         )
//     }
//     function handleWeekendsToggle() {
//         setWeekendsVisible(!weekendsVisible)
//     }
//     function handleDateSelect(selectInfo) {
//         let title = prompt('Please enter a new title for your event')

//         let calendarApi = selectInfo.view.calendar

//         calendarApi.unselect() // clear date selection

//         if (title) {
//             calendarApi.addEvent({
//                 id: createEventId(),
//                 title,
//                 start: selectInfo.startStr,
//                 end: selectInfo.endStr,
//                 allDay: selectInfo.allDay
//             })
//         }
//     }
//     return (
//         <section>
//             {/* <div class="w-[400px]"> */}
//             <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 headerToolbar={{
//                     left: 'prev,next',
//                     center: 'title',
//                     right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                 }}
//                 initialView='dayGridMonth'
//                 editable={true}
//                 selectable={true}
//                 selectMirror={true}
//                 dayMaxEvents={true}
//                 weekends={weekendsVisible}
//                 initialEvents={INITIAL_EVENTS}
//                 select={handleDateSelect}
//             />
//             {/* </div> */}
//             {/* <div>
//                 <label class="mr-3">Toggle Weekends</label>
//                 <input type="checkbox" onChange={(e) => setWeekendsVisible(!weekendsVisible)}></input>
//             </div> */}
//         </section>
//     )
// }

export default function Loans() {
    const [modalOpen, setModalOpen] = useState(false)
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event)
    }
    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Loan</button>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                ref={calendarRef}
                headerToolbar={{
                    left: 'prev,next',
                    // center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
            />
            <AddModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}
// function CalenderTest() {

//     return (
//         <section class="w-[400px]">
//             <FullCalendar
//                 plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//                 headerToolbar={{
//                     left: 'prev,next addEvent',
//                     // center: 'title',
//                     right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                 }}
//                 footerToolbar={{
//                     // center: 'title',
//                 }}
//                 customButtons={{
//                     addEvent: {
//                         text: 'Reserve',
//                         click: () => {
//                             // var tempdate = prompt('Enter a date in YYYY-MM-DD format')
//                             // var date = new Date(tempdate + 'T00:00:00')
//                             // if (!isNaN(date.valueOf())) {
//                             //     calendar.addEvent({
//                             //         title: 'dynamic event',
//                             //         start: date,
//                             //         allDay: true
//                             //     })
//                             // }// valid date?
//                         }
//                     }
//                 }}

//                 initialView="dayGridMonth"
//                 events={[
//                     {
//                         title: 'event 1',
//                         start: '2024-09-09T10:00:00',
//                         end: '2024-09-08T11:00:00',
//                     }
//                 ]}
//             />
//         </section>
//     )
// }