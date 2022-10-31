import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h2 className="name">Code Scam</h2>
      {/* <IconButton>
            <PersonIcon fontSize='large' className='header__icon'/>
        </IconButton> */}

      <img
        src="https://cdn.dribbble.com/userupload/2445208/file/original-36e8f98866a8475c749554b2e3cecf95.png?resize=400x0"
        alt="Logo"
        className="header__logo"
      />

      {/* <IconButton>
            <ChatIcon className='header__icon'/>
        </IconButton> */}
      <h2 className="name">Code Scam</h2>
    </div>
  );
}

export default Header;
