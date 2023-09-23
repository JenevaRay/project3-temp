const Footer = () => {
  return (
    <footer className="bg-zinc-50 py-4 pt-20">
      <div className="relative z-0 mx-auto flex w-full items-center justify-center p-4">
        <span className="text-md text-zinc-400 sm:text-center">
          &copy; Codethon {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
