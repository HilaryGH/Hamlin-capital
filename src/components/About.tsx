function About() {
  return (
    <div className=" flex flex-col my-6 mx-auto items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-dark ">
        About us
      </h1>
      <p className=" text-lg max-w-[800px] mx-auto text-center text-dark">
        Hamlin Capital is an investment bank based in Addis Ababa, Ethiopia,
        dedicated to connecting capital to opportunities. We specialize in
        capital solutions that empower clients to achieve their strategic
        objectives.{" "}
      </p>
      <button className="bg-[#ADF802] text-dark px-6 py-2 rounded-full hover:bg-[##FACC15] transition">
        Start a Project
      </button>
    </div>
  );
}

export default About;
