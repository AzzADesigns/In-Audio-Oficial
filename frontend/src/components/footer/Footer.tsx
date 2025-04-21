
export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row md:justify-between w-full h-[320px]  xl:h-[400px] md:h-[450px]   md:items-center text-tertiary text-xs md:text-lg font-uniq mb-5">
        <div className="">
            <img
                src="Logo1.svg"
                alt=""
                className="md:w-[80%]"
            />
        </div>

        <section className="flex w-full justify-between mt-5">
            <div className="flex flex-col gap-2">
                <p>Develop: AzzADesigns</p>
                <p>Phone: 2236979758</p>
                <p>Gmail: walter.azariel.moreno</p>
            </div>
            <div className="flex flex-col gap-2">
                <p>Linkedin:{" "}
                    <a 
                        href="https://www.linkedin.com/in/azariel-moreno-4267ba254/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer hover:text-secundary"
                    >Azariel Moreno</a>    
                </p> 
                <p>Github:{" "}
                    <a 
                        href="https://github.com/AzzADesigns"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer hover:text-secundary"
                    >AzzADesigns</a>    
                </p> 
                <a href="">Instragram: Azza More</a>
            </div>
        </section>
    </footer>
  )
}
