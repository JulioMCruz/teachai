'use client';

import type { NextPage } from 'next';
import Head from 'next/head';

import { useAccount, usePrepareContractWrite } from "wagmi";
import { useState, useEffect } from "react";

import { PromptForm } from '@/components/prompt-form'
import { cn } from '@/lib/utils'
import EmptyScreen  from '@/components/empty-screen';
import React from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, polygonMumbai } from 'viem/chains'
import { wagmiAbi } from '../abi/abi'

interface promptQuestions {
  message: string;
  id?: number;
  option1?: string;
  option2?: string;
  optionResponse?: number;
  status?: string;
}

export default function Home() {

  const [existPreviousMessage, setExistPreviousMessage] = React.useState(false);
  const  [promptQuestions, setPromptQuestions] = useState<promptQuestions[]>([]);

  const walletClient = createWalletClient({
    chain: polygonMumbai,
    transport: custom(window.ethereum)
  })

  const updateValueInParent = async (prompt: string) => {

    // set the message
    const newPrompt : promptQuestions= {
      message: prompt,
    };
    setPromptQuestions([...promptQuestions, newPrompt]);

    // system add options to response
    newPrompt.option1 = prompt + " - Option 1";
    newPrompt.option2 = prompt + " - Option 2";

    const [account] = await walletClient.getAddresses();

    await walletClient.writeContract({
      address: '0xD5cFA2271467e49059CdACF37622d3b76C64199D',
      abi: wagmiAbi,
      functionName: 'setPrompt',
      args: [prompt],
      account: account,
      chain: polygonMumbai
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  };

  const updatePromptResponse = (index: number, option: number) => {
    const newPrompt = promptQuestions[index];
    newPrompt.optionResponse = option;
    setPromptQuestions([...promptQuestions]);
  };

  return (
    <div>
      <Head>
        <title>Teach AI</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />*
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        {(!(promptQuestions.length>0)) && (
          <EmptyScreen />
        )}

        {promptQuestions.map((promptQuestion, index) => (
          <Card key={index} className='mx-16 px-4 my-4 py-4'>
            <CardHeader>
              <CardTitle>You said: {promptQuestion.message}</CardTitle>
            </CardHeader>
            <CardContent>

                <Card className='flex justify-between py-4 my-4 mx-4 px-4'>
                  <Label>System response: {promptQuestion.option1}</Label>
                  { (!promptQuestion.optionResponse) && (
                    <Button onClick={ () => updatePromptResponse(index, 1)}>Select</Button>
                  )
                  }
                </Card>
                <Card className='flex justify-between py-4 my-4 mx-4 px-4'>
                  <Label>System response: {promptQuestion.option2}</Label>
                  { (!promptQuestion.optionResponse) && (
                    <Button onClick={ () => updatePromptResponse(index, 2)}>Select</Button>
                    )
                  }
                </Card>
            </CardContent>
            { (promptQuestion.optionResponse) && (
              <CardFooter>
                <CardTitle className="text-lg">System response: {(promptQuestion.optionResponse == 1) ? promptQuestion.option1 : promptQuestion.option2}</CardTitle>
              </CardFooter>
            )}
          </Card>
        ))}
        <ChatScrollAnchor trackVisibility={true} />

        <div className={cn('pb-[200px] pt-4 md:pt-10')}>
          <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
            <div className="mx-auto sm:max-w-2xl sm:px-4">
              <div className="space-y-4 border-t bg-background mx-8 mb-8 px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                <PromptForm propVariable={existPreviousMessage} updateValue={updateValueInParent}/>
              </div>          
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}