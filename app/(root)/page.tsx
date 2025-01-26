import BookList from "@/components/ui/BookList";
import BookOverview from "@/components/ui/BookOverview";
import { sampleBooks } from "../constants";

const Home=async()=> {

  return (
    <>
    <BookOverview {...sampleBooks[0]}/>
    <BookList title="Latest Books" books={sampleBooks} containerClassName = "mt-28"/>
    </>
  );
}

export default Home