<script>
// @ts-nocheck

    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import '@event-calendar/core/index.css';

    export let summonToolbar
    export const addEvent = (eventInfo) => {
        ec.addEvent(eventInfo)
        ec = ec.unselect()
    }

    export const editEvent = (eventInfo) => {
        ec.updateEvent(eventInfo)
    }

    export const handleCancel = () => {
        ec.unselect()
    }

    export const deleteEvent = (id) => {
        ec.removeEventById(id)
    }

    let ec;
    let plugins = [TimeGrid, Interaction];
    let options = {
        allDaySlot: false,
        headerToolbar: {start: '', center: '', end: ''},
        view: 'timeGridWeek',
        dayHeaderFormat: {weekday: 'long', month: 'numeric', day: 'numeric'}, 
        slotDuration: '00:15',
        editable: true,
        dayMaxEvents: true,
        firstDay: 1,
        unselectAuto: false,
        eventClick: (info) => {summonToolbar({event: info.event})},
        events: [
            // events added here using addEvent(), called from Event.svelte
        ],
        selectable: true,
        select: (info) => {summonToolbar({event: info})},
        slotMinTime: '07:00:00',
        slotMaxTime: '22:00:00'
    };


</script>

<Calendar bind:this={ec} {plugins} {options} />


