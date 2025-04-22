
export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row lg:h-14 md:justify-between w-full mt-20  lg:text-xl   md:items-center text-tertiary text-md font-uniq mb-5">
        <div className="">
            <img
                src="Logo1.svg"
                alt=""
                className="md:w-[80%]"
            />
        </div>

        <section className="flex w-full justify-between mt-5">
            <div className="flex  gap-5 lg:gap-7 justify-center xl:justify-end w-full">
    
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
                
            </div>
        </section>
    </footer>
  )
}
