const Navbar = () => {
  return (
    <nav className="w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">My Portfolio</div>
        <div>
          <a href="#home" className="px-3 hover:underline">Home</a>
          <a href="#about" className="px-3 hover:underline">About</a>
          <a href="#projects" className="px-3 hover:underline">Projects</a>
          <a href="#contact" className="px-3 hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;