

import {z} from 'zod';


export const createBookingZodSchema = z.object({
    tour:z.string(),
    guessCount:z.number().positive()


})

export const updateBookingStatusSchema = z.object({
    status:z.enum(Object.values("") as [string])
})