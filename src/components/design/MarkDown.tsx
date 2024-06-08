import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import rehypeRaw from 'rehype-raw';
import { generateHeadingId } from '~/lib/markdown-util';
import NewsLetter from './md/NewLetter';

const MarkDown = ({ text, className }: { text: string; className?: string }) => {
  const [isRemoteMD, setIsRemoteMD] = useState<boolean>(false);
  const [remoteMdContent, setRemoteMdContent] = useState<string>('loading...');

  useEffect(() => {
    const signal = 'remote~sync:';
    let isRemoteMD = text.trim().startsWith(signal);
    setIsRemoteMD(isRemoteMD);
    if (!isRemoteMD) return;

    const url = text.trim().split(signal)[1] || 'null';

    axios
      .get(url)
      .then((res) => {
        setRemoteMdContent(res.data);
      })
      .catch(() => {
        setRemoteMdContent('Error loading remote MD');
      });
  }, [text]);

  return (
    <>
      <ReactMarkdown
        skipHtml={false}
        className={className ? className : 'mark-down'}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1({ children }) {
            return <h1 id={generateHeadingId(children.toString())}>{children}</h1>;
          },
          h2({ children }) {
            return <h2 id={generateHeadingId(children.toString())}>{children}</h2>;
          },
          h3({ children }) {
            return <h3 id={generateHeadingId(children.toString())}>{children}</h3>;
          },
          li({ children }) {
            return (
              <li
                style={{
                  marginLeft: '1rem',
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                {children}
              </li>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = Array.isArray(match) && match.length > 0 ? match[1] : '';

            if (language === 'mdx') {
              const { componentName, props } = parseMDXComponent(children.toString().trim());
              return <CustomComponentRenderer componentName={componentName || ''} props={props} />;
            }

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

/**
 * 💀 DANGER: POSSIBILITY OF XSS ATTACH BE AWARE OF THAT
 * TODO: fix this
 * @param componentString
 * @returns
 */
function parseMDXComponent(componentString: string) {
  const componentNameRegex = /<(\w+)/; // Match component name
  const propsRegex = /{(.+?)}/; // Match props within curly braces
  const componentNameMatch = componentNameRegex.exec(componentString);
  const propsMatch = propsRegex.exec(componentString);

  let componentName = null;
  let props = {};

  if (componentNameMatch) {
    componentName = componentNameMatch[1];
  }

  if (propsMatch) {
    try {
      // Wrap keys in double quotes to make it valid JSON
      const propsString = propsMatch[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
      props = JSON.parse(`{${propsString}}`);
    } catch (error) {
      console.error('Error parsing props:', error);
    }
  }

  return {
    componentName,
    props
  };
}

const CustomComponentRenderer = ({
  componentName,
  props
}: {
  componentName: string;
  props: { [key: string]: string };
}) => {
  switch (componentName.toLowerCase()) {
    case 'newsletter':
      return <NewsLetter uid={props['uid'] || 'misc'} />;
  }
  return <></>;
};

export default MarkDown;
