import "./search.css"

export const Search = () => {
    
    return (
        <section className="w-full flex-center"> 
            <form action="" className="w-60 h-20 md:w-[55%] md:h-40 lg:w-[40%] md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 lg:h-36 border-4 border-secundary rounded-full flex flex-col p-4 md:p-10 xl:p-3  font-uniq bg-primary">
                <h3 className="text-secundary px-10 text-xs md:text-xl mb-1 2xl:mb-3">Search</h3>
                <input type="search" placeholder="Search Music" name="search" className="outline-none focus:outline-none focus:ring-0 text-tertiary flex items-end text-xl md:text-3xl xl:text-5xl px-10 caret-secundary" />
            </form>
        </section>
    )
}
//fijate en este video: para animar el search : https://youtu.be/D-ZTD_dplAI?feature=shared