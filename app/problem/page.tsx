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
        <header className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
            <ChevronLeft className="p-2 w-8 h-8 rounded-full hover:bg-gray-700 cursor-pointer" onClick={handleBack} />
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                <h1 className="text-lg">Problem (08/30): Counting Stars</h1>
                {solved && <Check className="w-4 h-4 text-green-500" />}
            </div>
        </header>
    );
}

function Problem({ solved, setSolved }: { solved: boolean, setSolved: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();

    const [code, setCode] = useState<string>(
        `// Write a function countStars that takes an array of strings as input,
// where each string represents a row of the night sky, and stars are
// represented by the '*' character. The function should return the total number
// of stars in the sky.

function countStars(sky) {
    // Your code here
}

const sky = [
    ".*..*",
    "...*.",
    "**.*."
];

return countStars(sky);
`
    );
    const [output, setOutput] = useState<string>("");
    const [notSolved, setNotSolved] = useState<boolean>(false);
    const [loadingRun, setLoadingRun] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

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
                setOutput(String(result));
            } catch (error) {
                setOutput(`Error: ${(error as Error).message}`);
            }
        }, 1000);
    };

    const solution = "6";

    const handleSubmit = () => {
        // Animate a loading state
        setLoadingSubmit(true);

        try {
            // Simulate a delay
            setTimeout(() => {
                const result = new Function(code)();
                const output = String(result);
            
                if (output === solution) {
                    setSolved(true);
                    setNotSolved(false);
                } else {
                    setNotSolved(true);
                }
            
                setOutput(output);
                setLoadingSubmit(false);
            }, 1000);
        } catch (error) {
            setOutput(`Error: ${(error as Error).message}`);
            setNotSolved(true);
            setLoadingSubmit(false);
        }
    };

    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <main className="flex grow">
            <div className="flex grow">
                <section className="h-full w-1/2">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                        options={{
                            selectOnLineNumbers: true,
                            minimap: { enabled: false },
                            wordWrap: "on",
                        }}
                    />
                </section>

                <section className="h-full w-1/2">                 
                    <div className="px-4 bg-gray-800/50 w-full min-h-full text-gray-300">
                        <pre>{output}</pre>

                        {notSolved && (
                            <>
                                <pre className="text-red-500">Your solution is wrong. Try again.</pre>
                                <pre className="text-red-500">Expected output: {solution}</pre>
                                <pre className="text-red-500">Your output: {output}</pre>
                            </>
                        )}

                        {solved && (
                            <pre className="text-green-500">Congratulations! You solved the problem.</pre>
                        )}
                    </div>

                    {solved ? (
                        <div className="absolute bottom-0 right-0 flex gap-2 items-end mr-5 mb-2">
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