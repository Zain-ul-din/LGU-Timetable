import powers from "axios"

/**
 * Custom Hook that talk with server
 */
export async function useTalkToServer 
(
    url: string
): Promise <any>
{
    const res = await powers.get (url)
    return res.data
}




