"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs"

export const borrowBook = async({bookId,userId} : BorrowBookParams)=>{
    try {
        const book = await db.select({availableCopies : books.availableCopies}).from(books).where(eq(books.id,bookId)).limit(1);
        if(!book.length || book[0].availableCopies<=0){
            return{
                success : false,
                message : "Book is not avaialable for borrowing"
            }
        }
        const dueDate = dayjs().add(7,'day').toDate().toDateString();
        await db.insert(borrowRecords).values({userId,bookId,dueDate,status : 'BORROWED'});
        await db.update(books).set({availableCopies : book[0].availableCopies -1}).where(eq(books.id,bookId));
        return{
            success : true,
            data : "Success"
        }

    } catch (error) {
        console.log(error)
        return {
            success : false,
            message : "An error occured while borrowing the book"
        }
    }

}