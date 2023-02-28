<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import '@event-calendar/core/index.css';

    const now = new Date()
    let newStart = null;
    let newEnd = null;
    let idCount = 0;

    let ec;
    let plugins = [TimeGrid, Interaction];
    let options = {
        eventDragStart: () => {console.log('UR DRAGGING')},
        dateClick: ({date: dateTime}) => {handleDateTimeClick(dateTime)},
        view: 'timeGridWeek',
        slotDuration: '00:15',
        editable: true,
        events: [
            // events added here using handleDateTimeClick()
        ]
    };

    const handleDateTimeClick = (time) => {
        if (!newStart) {
            newStart = time
        } else if (!newEnd) {
            newEnd = new Date(time.getTime() + 900000)
            ec.addEvent({
                id: idCount,
                title: '',
                start: newStart,
                end: newEnd,
            })
            idCount += 1
            newStart = null
            newEnd = null
        }
        console.log(newStart, newEnd)
    }

</script>

<Calendar bind:this={ec} {plugins} {options} />


