
'use client';

import type { NextPage } from 'next';
import Head from 'next/head';

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";


const Profile: NextPage = () => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>

        <h1>Profile</h1>
        
      </main>

    </div>
  );
};

export default Profile;