<script>
// @ts-nocheck

    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import '@event-calendar/core/index.css';

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
        events: [
            // events added here using handleDateTimeClick()
        ],
        selectable: true,
        select: (info) => {handleSelection(info)},
    };

    const handleSelection = (selection) => {
            ec.addEvent({
                id: idCount,
                title: 'Available virtually',
                start: selection.start,
                end: selection.end,
            })
            idCount += 1
            
        }
</script>

<Calendar bind:this={ec} {plugins} {options} />


