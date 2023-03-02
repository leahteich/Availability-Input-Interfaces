<script>
// @ts-nocheck

    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import '@event-calendar/core/index.css';

    export let summonToolbar
    export const addEvent = (eventInfo) => {
        idCount += 1
        ec.addEvent({
            id: idCount,
            title: eventInfo.title,
            start: eventInfo.start,
            end: eventInfo.end,
        })
    }

    let idCount = 0;
    let ec;
    let plugins = [TimeGrid, Interaction];
    let options = {
        allDaySlot: false,
        eventDragStart: (info) => {console.log(info.view)},
        headerToolbar: {start: 'title', center: '', end: ''},
        view: 'timeGridWeek',
        slotDuration: '00:15',
        editable: true,
        dayMaxEvents: true,
        firstDay: 1,
        eventClick: (info) => {eventClick(info)},
        events: [
            // events added here using handleDateTimeClick()
        ],
        selectable: true,
        select: (info) => {summonToolbar({event: info})},
    };


</script>

<Calendar bind:this={ec} {plugins} {options} />


