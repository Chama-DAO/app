import React from "react";
import logo from "../assets/logo.png";

function Auth({ createUser }: { createUser: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-center md:mt-4 mt-2 mb-2">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h1 className="text-primary font-heading font-bold">
          Chama<span className="text-secondaryAccent">DAO</span>
        </h1>
      </div>
      <h1 className="font-body text-center text-black mt-12 md:text-3xl text-xl">
        Password-less Authentication
      </h1>
      <div className="flex-col md:flex-row flex items-center w-full py-4 justify-center my-4">
        {" "}
        <button
          className="mt-8 w-3/4 md:mx-2 bg-primary text-white font-body font-semibold rounded-md py-2 px-4 md:text-lg"
          onClick={() => createUser()}
        >
          Use Internet Identity
        </button>
        <button
          className="mt-8 w-3/4 md:mx-2 bg-primary text-white font-body font-semibold rounded-md py-2 px-4 md:text-lg cursor-not-allowed"
          disabled
        >
          Use NFID
        </button>
      </div>
      <div className="w-full h-[0.2px] bg-black/20 my-4"></div>
      <p className="font-body text-gray-500 md:text-sm text-xs leading-relaxed">
        <span className="text-primary font-heading underline">
          <a
            href="https://medium.com/distrikt/internet-identity-the-zero-knowledge-identity-system-powering-distrikts-user-authentication-cb577384aa0a"
            target="_blank"
          >
            Internet Identity
          </a>
        </span>{" "}
        is an authentication framework used primarily in decentralized
        applications (dApps) on the Internet Computer blockchain. It aims to
        offer a more secure and privacy-conscious way for users to log in to
        websites and apps without needing traditional credentials like
        passwords.
      </p>
      <p className="font-body text-gray-500 md:text-sm text-xs leading-relaxed mt-4">
        <span className="text-primary font-heading underline">
          <a
            href="https://medium.com/distrikt/internet-identity-the-zero-knowledge-identity-system-powering-distrikts-user-authentication-cb577384aa0a"
            target="_blank"
          >
            NFID
          </a>
        </span>{" "}
        Non-Fungible Identity or NFID, is a digital identity system that uses
        NFTs to represent unique identities on the blockchain. Each NFID is a
        unique token that can be used to authenticate a user across various
        platforms and services. It combines the principles of NFTs (uniqueness,
        ownership, and verifiability) with digital identity management.
      </p>
    </div>
  );
}

export default Auth;
