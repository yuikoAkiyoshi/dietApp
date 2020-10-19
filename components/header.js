import Link from "next/link";

const Header = () => {

  return (
    <>
      <div className="header">
        <div className="header__logo">DIET APP</div>
        <div className="header__links">
          <Link href="/">
            <a>TODO</a>
          </Link>
          <Link href="/usePoint">
            <a>POINT</a>
          </Link>
          <Link href="/weight">
            <a>WEIGHT</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .header {
          margin: auto;
          padding: 8px 32px 8px;
          background: #fff;
          letter-spacing: 0.4px;
          // background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
          background-image: linear-gradient(
            -225deg,
            #69eacb 0%,
            #eaccf8 48%,
            #6654f1 100%
          );
        }
        .header__logo {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          // background: -webkit-linear-gradient(0deg, #e14fad, #f9d423);
          // -webkit-background-clip: text;
          // -webkit-text-fill-color: transparent;
        }
        .header__links {
          display: flex;
          margin-top: 4px;
          font-size: 12px;
        }
        .header__links a {
          color: #333435;
          padding-right: 24px;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Header;
