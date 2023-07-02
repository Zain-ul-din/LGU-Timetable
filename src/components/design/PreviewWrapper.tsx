export default function PreviewWrapper (
    { children } : { children: React.ReactNode }
)
{
    return <>
        {process.env.NEXT_PUBLIC_preview === 'true' ? children : <></>}
    </>
}