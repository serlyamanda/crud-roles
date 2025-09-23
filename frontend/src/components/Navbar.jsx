import '../styles/Navbar.css';

function Navbar() {
  return (
    <div>
      {/* <!-- navbar --> */}
    <nav>
        <div className="wrapper">
            <div className="logo"><a href=''>Produk.</a></div>
            <div className="menu">
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    {/* <li><a href="#produk">Produk</a></li> */}
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/login" className="tbl-biru">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
