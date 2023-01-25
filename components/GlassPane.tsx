interface GlassPaneProps 
{
    children: React.ReactNode,
    className:string
}

export default function GlassPane(props:GlassPaneProps): React.ReactElement {
    return (
        <>
            <div className={`rounded-2xl border-solid border-2 border-gray-200 ${props.className}`}>
                {props.children}
            </div>
        </>
    );
}

