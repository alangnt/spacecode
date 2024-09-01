"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Editor, { OnChange } from "@monaco-editor/react";

import { ChevronLeft, Play, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProblemPage() {
    const [solved, setSolved] = useState<boolean>(false);

    return (
        <>
            <Header solved={solved} />
            <Problem solved={solved} setSolved={setSolved} />
        </>
    );
}

function Header({ solved }: { solved: boolean }) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <header className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700 text-center">
            <ChevronLeft className="p-2 w-8 h-8 rounded-full hover:bg-gray-700 cursor-pointer" onClick={handleBack} />
            <div className="flex items-center gap-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                <h1 className="text-lg max-sm:text-sm">Problem (09/01): Alien Message Decoder</h1>
                {solved && <Check className="w-4 h-4 text-green-500" />}
            </div>
        </header>
    );
}

function Problem({ solved, setSolved }: { solved: boolean, setSolved: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();

    const [code, setCode] = useState<string>(
        `// Write a function 'decodeMessage' that takes a string as input
// representing a message from aliens.
// The message consists of letters and spaces, but spaces represent pauses
// between words, and each word is reversed.
// The function should return the decoded message.

// Example usage:
// const message = decodeMessage('sihT is na elpmaxe'); // Output: 'This is an example'

function decodeMessage(message) {
    // Your code here
}`
    );
    const [output, setOutput] = useState<string>("");
    const [notSolved, setNotSolved] = useState<boolean>(false);
    const [loadingRun, setLoadingRun] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [testResults, setTestResults] = useState<string[]>([]);
    const [failedTestIndex, setFailedTestIndex] = useState<number | null>(null);

    const handleEditorChange: OnChange = (value) => {
        setCode(value || "");
    };
  
    const runCode = () => {
        setLoadingRun(true);
        setNotSolved(false);

        setTimeout(() => {
            try {
                setLoadingRun(false);
                const result = new Function(code)();
                const roundedResult = Math.round(result);
                setOutput(String(roundedResult));
            } catch (error) {
                setOutput(`Error: ${(error as Error).message}`);
            }
        }, 1000);
    };

    const testCases = [
        {
            input: 'return decodeMessage("ruoY tenalp skool ekil a lwob fo neila slaerec");',
            output: "Your planet looks like a bowl of alien cereals"
        },
        {
            input: 'return decodeMessage("I ma ton a namuh");',
            output: "I am not a human"
        },
        {
            input: 'return decodeMessage("sI otulP a tenalp");',
            output: "Is Pluto a planet"
        },
        {
            input: 'return decodeMessage("nolE ksuM si a suineg egnahc ym dnim");',
            output: "Elon Musk is a genius change my mind"
        },
    ];

    const handleSubmit = () => {
        setLoadingSubmit(true);
        setNotSolved(false);
        setTestResults([]);
        setFailedTestIndex(null);

        setTimeout(() => {
            try {
                let allTestsPassed = true;
                const newTestResults: string[] = [];

                for (let i = 0; i < testCases.length; i++) {
                    const testCase = testCases[i];
                    const result = new Function(code + testCase.input)();
                    const roundedResult = Math.round(result);
                    const output = String(roundedResult);
                    newTestResults.push(output);

                    if (output !== testCase.output) {
                        allTestsPassed = false;
                        setFailedTestIndex(i);
                        break;
                    }
                }

                setSolved(allTestsPassed);
                setNotSolved(!allTestsPassed);
                setTestResults(newTestResults);
                setOutput(newTestResults[0]); // Set output to the result of the first test case
            } catch (error) {
                setOutput(`Error: ${(error as Error).message}`);
                setNotSolved(true);
            } finally {
                setLoadingSubmit(false);
            }
        }, 1000);
    };

    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <main className="flex grow">
            <div className="flex max-sm:flex-col grow">
                <section className="sm:h-full h-1/2 sm:w-1/2 w-full max-sm:border-b border-gray-700 overflow-hidden flex flex-col">
                    <Editor
                        defaultLanguage="javascript"
                        value={code}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                        options={{
                            selectOnLineNumbers: true,
                            minimap: { enabled: false },
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                        }}
                        className="flex-grow"
                    />
                </section>

                <section className="sm:h-full h-1/2 sm:w-1/2 w-full">                 
                    <div className="px-4 bg-gray-800/50 w-full min-h-full text-gray-300">
                        <pre>{output}</pre>

                        {notSolved && failedTestIndex !== null && (
                            <>
                                <pre className="text-red-500">Your solution is wrong. Try again.</pre>
                                <pre className="text-red-500">Test Case {failedTestIndex + 1} failed:</pre>
                                <pre className="text-red-500">Input: {testCases[failedTestIndex].input}</pre>
                                <pre className="text-red-500">Expected output: {testCases[failedTestIndex].output}</pre>
                                <pre className="text-red-500">Your output: {testResults[failedTestIndex]}</pre>
                            </>
                        )}

                        {solved && (
                            <>
                                {testCases.map((testCase, index) => (
                                    <pre key={index} className="text-green-500 flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        Test Case {index + 1}: {testResults[index]} for an expected of {testCase.output}
                                    </pre>
                                ))}
                                <pre className="text-green-500">Congratulations! You solved the problem.</pre>
                            </>
                        )}
                    </div>

                    {solved ? (
                        <div className="absolute bottom-0 right-0 flex gap-2 items-end mr-5 mb-2 max-sm:flex-col">
                            <button onClick={() => router.push("/")} className="py-2 px-6 bg-white rounded-full text-black hover:bg-gray-100">Go Home</button>
                            <button onClick={handleRestart} className="py-2 px-6 bg-white rounded-full text-black hover:bg-gray-100">Restart</button>
                        </div>
                    ) : (
                        <div className="absolute bottom-0 right-0 flex flex-col gap-2 items-end mr-5 mb-2">
                            {loadingRun ? (
                                <Button disabled>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Running...
                                </Button>
                            ) : (
                                <button onClick={runCode} className="p-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 hover:scale-105 transition-all duration-150 w-10 h-10">
                                    <Play />
                                </button>
                            )}

                            {loadingSubmit ? (
                                <Button disabled>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Running...
                                </Button>
                            ) : (
                                <button onClick={handleSubmit} className="py-2 px-6 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 hover:scale-105 transition-all duration-150">
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}