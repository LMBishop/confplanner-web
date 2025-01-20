import { TZDate } from "@date-fns/tz";
import { defineStore } from "pinia";

interface Schedule {
  conference: Conference;
  tracks: Track[];
  days: Day[];
}

interface Conference {
  title: string;
  venue: string;
  city: string;
  start: Date;
  end: Date;
  days: number;
  dayChange: string;
  timeslotDuration: string;
  baseUrl: string;
  timeZoneName: string;
}

interface Track {
  name: string;
  slug: string;
}

interface Day {
  date: string;
  start: Date;
  end: Date;
  rooms: Room[];
}

interface Room {
  name: string;
  events: Event[];
}

export interface Event {
  id: number;
  guid: string;
  date: string;
  start: Date;
  end: Date;
  duration: string;
  room: string;
  url: string;
  track: Track;
  type: string;
  title: string;
  abstract: string;
  persons: Person[];
  attachments: Attachment[];
  links: Link[];
}

interface Person {
  id: number;
  name: string;
}

interface Attachment {
  type: string;
  href: string;
  name: string;
}

interface Link {
  href: string;
  name: string;
}

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref(null as Schedule | null)

  const events = ref([] as Event[])
  const eventsPerDay = ref({} as { [key: string]: Event[] })
  const eventsPerTrack = ref({} as { [key: string]: Event[] })
  
  const tracks = ref({} as { [key: string]: Track })
  
  const setSchedule = (newSchedule: Schedule) => {
    schedule.value = newSchedule
    
    console.log(newSchedule)
    
    tracks.value = {}
    schedule.value.tracks.forEach(track => {
      track.slug = convertToSlug(track.name)
      tracks.value[track.name] = track
    });
    
    console.log("hi")

    events.value = []
    schedule.value.days.forEach(day => {
      day.start = new TZDate(day.start, newSchedule.conference.timeZoneName)
      day.end = new TZDate(day.end, newSchedule.conference.timeZoneName)
      day.rooms.forEach(room => {
        room.events.forEach(event => {
          normalizeDates(event, newSchedule.conference.timeZoneName)

          events.value.push(event)

          event.track = tracks.value[event.track as unknown as string]
        })
      })
    })
    events.value.sort((a, b) => { 
      return a.start.getTime() - b.start.getTime()
    })

    console.log("hi2")
    console.log(newSchedule)

    eventsPerDay.value = {}
    events.value.forEach(event => {
      const date = event.date.split('T')[0]
      if (!eventsPerDay.value[date]) {
        eventsPerDay.value[date] = []
      }
      eventsPerDay.value[date].push(event)
    })
    
    eventsPerTrack.value = {}
    events.value.forEach(event => {
      if (!eventsPerTrack.value[event.track.name]) {
        eventsPerTrack.value[event.track.name] = []
      }
      eventsPerTrack.value[event.track.name].push(event)
    });
  }
  
  return {schedule, events, eventsPerDay, eventsPerTrack, setSchedule}
})

function normalizeDates(event: Event, timeZone: string) {
  event.start = new TZDate(event.start, timeZone)
  event.end = new TZDate(event.end, timeZone)
}

function parseDuration(duration: string) {
  const [hours, minutes] = duration.split(':').map(Number)
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000
}

function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}