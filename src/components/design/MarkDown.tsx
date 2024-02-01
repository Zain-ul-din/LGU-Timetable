import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import rehypeRaw from 'rehype-raw';
import { generateHeadingId } from '~/lib/markdown-util';

const MarkDown = ({ text, className }: { text: string; className?: string }) => {

    const [isRemoteMD, setIsRemoteMD] = useState<boolean>(false);
    const [remoteMdContent, setRemoteMdContent] = useState<string>("loading...");

    useEffect(()=> {
        const signal = "remote~sync:";
        let isRemoteMD = text.trim().startsWith(signal);
        setIsRemoteMD(isRemoteMD);
        if(!isRemoteMD) return;

        const url = text.trim().split(signal)[1] || "null"
        
        axios.get(url)
        .then(res=> {setRemoteMdContent(res.data)})
        .catch(()=>{
            setRemoteMdContent("Error loading remote MD")
        })
    }, [text])

    return (
        <>
            <ReactMarkdown
                skipHtml={false}
                className={className ? className : 'mark-down'}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1({ children }) {
                        return <h1 id={generateHeadingId(children.toString())}>{children}</h1>
                    },
                    h2({ children }) {
                        return <h2 id={generateHeadingId(children.toString())}>{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 id={generateHeadingId(children.toString())}>{children}</h3>
                    },
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={nightOwl}
                                language={match[1]}
                                PreTag="div"
                                wrapLongLines={true}
                                className="syntax-highlighter"
                                // {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}>
                {isRemoteMD ? remoteMdContent : text}
            </ReactMarkdown>
        </>
    );
};

export default MarkDown;
