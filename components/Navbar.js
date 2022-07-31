import Image from "next/image";
import Link from "next/link";
import logo from "../public/disney.png";

export const Navbar = ({ account }) => {
  return (
    <div className="mx-3 py-3 flex justify-between">
      <Link href={"/"} className="cursor-pointer">
        <Image src={logo} alt="Disney Logo" width={90} height={50} />
      </Link>
      <div className="flex items-center space-x-3">
        <p>Welcome {account.username}</p>
        <div className="">
          <Image
            width={40}
            height={40}
            objectFit="cover"
            className="rounded-full"
            alt={account.username}
            src={account.avatar.url}
          />
        </div>
      </div>
    </div>
  );
};
