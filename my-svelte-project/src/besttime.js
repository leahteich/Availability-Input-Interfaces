// Software Component: Reusable components, importing JS time module
import moment from 'moment'


//Availability Concept: Best time, helping organizer act on availability preferences to schedule a time 
export function getBest(users) {

  let alltimes = {}
  for (let i=0; i < users.length; i++) {
    for (let j=0; j<users[i].times.length; j++) {
      let day = users[i].times[j].split("_")[1]
      if (!(day in alltimes)) 
        alltimes[day] = [users[i].times[j].split("_")[0]]
      else 
        alltimes[day].push(users[i].times[j].split("_")[0])
    }
  }

// Availibility Concept: Time blocks  
let newtimeslots = {}

for (let i=0; i < Object.keys(alltimes).length; i++) 
  newtimeslots[Object.keys(alltimes)[i]] = []

for (const [key, value] of Object.entries(alltimes)) {
  for (let i=0; i < value.length; i++) {
    let start = moment(value[i].split("-")[0], "hh:mm A")
    let end = moment(value[i].split("-")[1],"hh:mm A")
    let newtime = start;
    while (!(newtime.isSame(end))) {
      newtimeslots[key].push(newtime.format("hh:mm A"))
      newtime = start.add(30, 'minutes');
    }
  }         
}

let allBest = {}

// Availibility Concept: Calculating overlap  
for (const [key, value] of Object.entries(newtimeslots)) {
  for (let i=0; i<value.length; i++) {
    const counts = {}
    for (const num of value) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    allBest[key] = counts
  }
}
  return allBest
}
