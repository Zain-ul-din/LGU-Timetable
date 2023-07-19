import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import rehypeRaw from 'rehype-raw';

const MarkDown = ({ text, className }: { text: string; className?: string }) => {
    return (
        <>
            <ReactMarkdown
                skipHtml={false}
                className={className ? className : 'mark-down'}
                rehypePlugins={[rehypeRaw]}
                components={{
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
                {text}
            </ReactMarkdown>
        </>
    );
};

export default MarkDown;
